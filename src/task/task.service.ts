import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Like, Repository } from 'typeorm';
import { Project } from 'src/project/project.entity';
import { CreateTaskDto } from './dto/create-task.dto';

interface IOptions {
    page: number,
    limit: number,
    status: string,
    keyword: string
}

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,

        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    async getAllTask(options: IOptions) {
        const take = options.limit || 100;
        const page = options.page || 1;
        const skip = take * (page - 1);

        if (Object.values(options).every(el => el === undefined)) {
            const task = await this.taskRepository.find()
            if (!task) {
                throw new NotFoundException("Task Not Found")
            }
            return task
        }

        const task = await this.taskRepository.find({
            take: take, skip: skip,
            where: [{ name: Like(`%${options.keyword}%`) }, { status: options.status }]
        })

        if (!task) {
            throw new NotFoundException("Task Not Found")
        }
        return task;

    }

    async createTask(input: CreateTaskDto) {
        const project = await this.projectRepository.findOne({ where: { id: input.idOfProject } })
        if (!project) {
            throw new NotFoundException("Project Not Found")
        }
        delete input.idOfProject;
        const task = this.taskRepository.save({ ...input, project: project })
        if (!task) {
            throw new BadRequestException("Saving Failed")
        }
        return task
    }

    async removeTask(id: number) {
        const task = await this.taskRepository.find({ where: { taskId: id } });
        if (!task) {
            throw new NotFoundException("Task Not Found");
        }
        const taskRemoved = await this.taskRepository.remove(task);
        if (!taskRemoved) {
            throw new BadRequestException("Removing failed")
        }
    }


}
