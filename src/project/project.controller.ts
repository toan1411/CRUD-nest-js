import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import RoleGuard from 'src/auth/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/entities/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) { }
    @Get()
    async getAllProject(@Query('page') page: number, @Query('limit') limt: number) {
        return await this.projectService.getAllProject(page, limt)
    }

    @Post()
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async createProject(@Body() input: CreateProjectDto) {
        return await this.projectService.createProject(input)
    }

    @Patch(':id')
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateProject(@Body() input: UpdateProjectDto,@Param() id: number){
        return await this.projectService.updateProject(input,id)
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async removeProject(@Param() id: number){
        return await this.projectService.removeProject(id)
    }
}
