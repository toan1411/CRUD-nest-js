import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Like, Repository } from 'typeorm';

interface IOptions {
    page: number,
    limit: number,
    name: string,
    keyword: string
}

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) { }
    async getAllTask(options : IOptions) {
        const take = options.limit;
        const page = options.page;
        const skip = take * (page - 1);
        const task = await this.taskRepository.findBy({ name: Like(`%${options.keyword}%`)})

      return task

    }
}
