import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Project } from 'src/project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),
  TypeOrmModule.forFeature([Project])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: []
})
export class TaskModule { }
