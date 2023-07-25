import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserProjectService } from './userProject.service';
import { UserProjecDto } from './userProjectDto.dto';

@Controller('userProject')
export class UserProjectController {
    constructor(private readonly userProjectService : UserProjectService){
    }

    @Get()
    async getAllUserProject(){
        return await this.userProjectService.getAllUser()
    }

    @Post()
    async createUserProject(@Body() userProject : UserProjecDto){
        return await this.userProjectService.createUserProject(userProject)
    }

}
