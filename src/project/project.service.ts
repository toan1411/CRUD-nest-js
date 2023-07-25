import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/client.entity';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { User } from 'src/user/entities/user.entity';
import { UserProject } from 'src/user-project/userProject.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        @InjectRepository(UserProject)
        private readonly userProjectRepository : Repository<UserProject>
    ) { }

    async getAllProject(page: number, limt: number) {
        const skip = limt * (page - 1) || 0;
        // const projects = await this.projectRepository.createQueryBuilder("project")
        //     .leftJoinAndSelect("project.tasks", "task")
        //     .leftJoinAndSelect("project.client", "client")
        //     .leftJoinAndSelect("project.users", "user")
        //     .leftJoinAndSelect('project.timesheet', 'timeseheet').take(limt).skip(skip).getMany()
        const projects = await this.projectRepository.createQueryBuilder("project")
            .leftJoinAndSelect("project.userProjects", "userProject")
            .leftJoinAndSelect("userProject.user", "user")
            .take(limt).skip(skip)
            .getMany()
        if (!projects) {
            throw new NotFoundException("Project Not Found")
        }
        return projects;
    }

    async getProjectByUser(user : User){
        const project = await this.projectRepository.createQueryBuilder('project')
            .leftJoinAndSelect("project.userProjects","userProject")
            .leftJoinAndSelect("userProject.user","user")
            .where('user.username = :username',{username: user.username})
            .getMany()
        return project
    }

    async createProject(input: CreateProjectDto, user : User) {
        // const client = await this.clientRepository.findOne({ where: { id: input.idOfClient } })
        // if (!client) {
        //     throw new NotFoundException("Client Not Found")
        // }
        // delete input.idOfClient;
        // try {
        //     const createdProject = await this.projectRepository.save({
        //         ...input, client: client,
        //         timeStart: new Date(input.timeStart).toISOString().slice(0, 10),
        //         timeEnd: new Date(input.timeEnd).toISOString().slice(0, 10)
        //     })
        //     const savedUserProject  = await this.userProjectRepository.save({user: user, project: createdProject})
        //     return {createdProject,savedUserProject}
        // } catch (error) {
        //     throw new BadRequestException("saving failed")
        // }
    }

    async updateProject(input: UpdateProjectDto, id: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } })
        if (!project) {
            throw new NotFoundException('Project Not Found')
        }
        try {
            const projectSaved = await this.projectRepository.save({ ...project, ...input })
            return projectSaved
        } catch (error) {
            throw new BadRequestException('Saving failed')
        }
    }

    async removeProject(id: number) {
        const project = await this.projectRepository.findOne({ where: { id: id } })
        try {
            this.projectRepository.remove(project)
        } catch (error) {
            throw new BadRequestException('Deleting failed')
        }
    }

}
