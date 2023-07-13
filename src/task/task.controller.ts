import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('/task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    @Get()
    async getAllTask(@Query('limit') limit: number, @Query('page') page: number,
        @Query('status') status: string, @Query('keyword') keyword: string) {
        const options = {
            limit: limit,
            page: page,
            status: status,
            keyword: keyword
        }
        return await this.taskService.getAllTask(options)
    }

    @Post()
    async createTask(@Body() input: CreateTaskDto) {
        return await this.taskService.createTask(input);
    }

    @Patch(':id')
    async updateTask(@Body() input: CreateTaskDto, @Param() id: number) {
        return await this.taskService.updateTask(input,id)
    }

    @Delete(":id")
    @HttpCode(204)
    async removeTask(@Param("id") id) {
        return this.taskService.removeTask(id)
    }
}
