import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './project.dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }
    @Get()
    async getAllProject() {

    }

    @Post()
    async createProject(@Body() input: ProjectDto) {
        return await this.projectService.createProject(input)
    }
}
