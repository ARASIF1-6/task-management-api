import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsDateString, } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Finish backend API' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Complete NestJS task API', required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    example: '2026-12-31T00:00:00.000Z',
  })
  @IsDateString()
  dueDate: Date;
}