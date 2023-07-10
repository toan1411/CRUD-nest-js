import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';


@Controller('timesheet')
export class TimesheetController {
    constructor(private readonly timesheetService: TimesheetService) { }

    @Get()
    async getAllTimesheet(@Query('page') page: number, @Query('limit') limit: number, @Query('status') status: string) {
        return await this.timesheetService.getAllTimesheet(page, limit, status);
    }

    @Get(':id')
    async getTimesheetByID(@Param('id') id: number) {
        return await this.timesheetService.getTimesheetById(id);
    }

    @Post()
    async createTimesheet(@Body() input: CreateTimesheetDto) {
        return await this.timesheetService.createTimesheet(input);
    }

    @Patch(':id')
    async updateTimesheet(@Body() input: UpdateTimesheetDto, @Param('id') id: number) {
        return await this.timesheetService.updateTimesheet(input, id);

    }

    @Delete(':id')
    @HttpCode(204)
    async removeTimesheet(@Param('id') id : number){
        return await this.timesheetService.removeTimesheet(id);
    }


}
