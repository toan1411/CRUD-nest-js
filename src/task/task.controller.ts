import { Controller, Delete, Get, HttpCode, Param, Query } from '@nestjs/common';
import { TaskService } from './task.service';

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

    @Delete(":id")
    @HttpCode(204)
    async removeTask(@Param("id") id){
        return this.taskService.removeTask(id)
    }
}
