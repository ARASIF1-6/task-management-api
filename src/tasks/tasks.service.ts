import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repo: Repository<Task>,
  ) {}

  async createTask(dto, user) {
    if (new Date(dto.dueDate) <= new Date()) {
      throw new Error('Due date must be future');
    }

    const task = this.repo.create({ ...dto, user });
    return this.repo.save(task);
  }

  async getTasks(user, page = 1, limit = 10, status?) {
    const query = this.repo
      .createQueryBuilder('task')
      .where('task.userId = :id', { id: user.id });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    query.skip((page - 1) * limit).take(limit);

    const [tasks, total] = await query.getManyAndCount();

    return {
      data: tasks,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async getTaskById(id, user) {
    const task = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task || task.user.id !== user.id)
      throw new NotFoundException();

    return task;
  }

  async updateTask(id, dto, user) {
    const task = await this.getTaskById(id, user);
    Object.assign(task, dto);
    return this.repo.save(task);
  }

  async deleteTask(id, user) {
    const task = await this.getTaskById(id, user);
    return this.repo.remove(task);
  }
}