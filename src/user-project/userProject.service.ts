import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProject } from './userProject.entity';
import { Repository } from 'typeorm';
import { UserProjecDto } from './userProjectDto.dto';
import { Project } from 'src/project/project.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserProjectService {
    constructor(@InjectRepository(UserProject)
        private readonly userProjectRepository : Repository<UserProject>,
        @InjectRepository(Project)
        private readonly projectRepository : Repository<Project>,
        @InjectRepository(Project)
        private readonly userRepository : Repository<User>){}
    
        async getAllUser(){
            const userProject = await this.userProjectRepository.createQueryBuilder('userProject')
                .leftJoinAndSelect("userProject.project","project")
                .leftJoinAndSelect("userProject.user","user")
                .getMany()
            return userProject;
        }

        async createUserProject(userProject : UserProjecDto){
            const project = await this.projectRepository.findOne({where:{id: userProject.projectId}})
            if(!project){
                throw new BadGatewayException("Project Not Found")
            }
            const user = await this.projectRepository.findOne({where:{id: userProject.userId}})
            if(!user){
                throw new BadGatewayException("User Not Found")
            }
            try{
                const saved = await this.userProjectRepository.save({project: project, user:user});
                return saved
            }catch(err){
                throw new BadGatewayException("saving failed")
            }
          
        }
}
