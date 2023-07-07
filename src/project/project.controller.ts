import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDto } from './project.dto';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }
    @Get()
    async getAllProject(@Query('page') page: number, @Query('limit') limt: number) {
        return await this.projectService.getAllProject(page,limt)
    }

    @Post()
    async createProject(@Body() input: ProjectDto) {
        return await this.projectService.createProject(input)
    }
}
