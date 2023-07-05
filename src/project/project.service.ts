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
    ){}
    
    async getAllProject(){
        const projects = await this.projectRepository.find()
        if(!projects){
            throw new NotFoundException("Project Not Found")
        }
    }
    async createProject(input : ProjectDto){
        const client = await this.clientRepository.findOne({where:{id:input.idOfClient}})
        if(!client){
            throw new NotFoundException("Client Not Found")
        }
        const created = await this.projectRepository.save({...input, client: client})

        if(!created){
            throw new BadRequestException("saving failed")
        }

        return created;
    }
    
}
