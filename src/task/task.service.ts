import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Like, Repository } from 'typeorm';
import { Project } from 'src/project/project.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';

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
        try {
            const task = this.taskRepository.save({ ...input, project: project })
            return task
        } catch (error) {
            throw new BadRequestException("Saving Failed")
        }
    }

    async updateTask(input: UpdateTaskDto, id: number ){
        const task = this.taskRepository.findOne({where:{id:id}})
        if(!task){
            throw new NotFoundException('Task Not Found')
        }
        try {
            const taskSaved = this.taskRepository.save({...task,...input});
            return taskSaved
        } catch (error) {
            throw new BadRequestException('Saving failed')
        }
    }
     

    async removeTask(id: number) {
        const task = await this.taskRepository.find({ where: { id: id } });
        if (!task) {
            throw new NotFoundException("Task Not Found");
        }
        try {
            this.taskRepository.remove(task);
        } catch (error) {
            throw new BadRequestException("Removing failed")
        }
    }

}
