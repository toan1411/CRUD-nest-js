import { Controller, Get, Query } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('/task')
export class TaskController {
    constructor(private readonly taskService: TaskService) { }
    @Get()
    async getAllTask(@Query('limit') limit: number, @Query('page') page: number,
        @Query('filter') name: string, @Query('keyword') keyword: string) {
        const options = {
            limit: limit,
            page: page,
            name: name,
            keyword: keyword
        }

        return await this.taskService.getAllTask(options)
    }
}
