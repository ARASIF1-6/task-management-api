import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery, ApiParam, ApiResponse, } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@ApiTags('Tasks')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  create(@Body() dto: CreateTaskDto, @Req() req) {
    return this.service.createTask(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks with pagination and filter' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['pending', 'in-progress', 'completed'],
  })
  getAll(
    @Req() req,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('status') status?: string,
  ) {
    return this.service.getTasks(
      req.user,
      Number(page),
      Number(limit),
      status,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single task by ID' })
  @ApiParam({ name: 'id', example: 1 })
  getOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.service.getTaskById(id, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiParam({ name: 'id', example: 1 })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @Req() req,
  ) {
    return this.service.updateTask(id, dto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiParam({ name: 'id', example: 1 })
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.service.deleteTask(id, req.user);
  }
}