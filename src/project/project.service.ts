import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
import { ProjectDto } from './project.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) { }

    async getAllProject(page: number, limt: number) {
        const skip = limt*(page-1)||0;
        const projects = await this.projectRepository.createQueryBuilder("project")
        .leftJoinAndSelect("project.tasks","task")
        .leftJoinAndSelect("project.client", "client")
        .leftJoinAndSelect("project.users","user")
        .leftJoinAndSelect('project.timesheet','timeseheet').take(limt).skip(skip).getMany()
        if (!projects) {
            throw new NotFoundException("Project Not Found")
        }
        return projects;
    }
    async createProject(input: ProjectDto) {
        const client = await this.clientRepository.findOne({ where: { id: input.idOfClient } })
        if (!client) {
            throw new NotFoundException("Client Not Found")
        }
        delete input.idOfClient;
        const created = await this.projectRepository.save({ ...input, client: client })

        if (!created) {
            throw new BadRequestException("saving failed")
        }

        return created;
    }

}
