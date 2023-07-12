import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import RoleGuard from 'src/auth/gaurd/role.guard';
import { Role } from 'src/user/entities/role.enum';
import { AuthGuard } from '@nestjs/passport';


@Controller('timesheet/')
export class TimesheetController {
    constructor(private readonly timesheetService: TimesheetService) { }

    @Get()
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    async getAllTimesheet(@Query('page') page: number, @Query('limit') limit: number, @Query('status') status: string) {
        return await this.timesheetService.getAllTimesheet(page, limit, status);
    }

    @Get('detail/:id')
    async getTimesheetByID(@Param('id') id: number) {
        return await this.timesheetService.getTimesheetById(id);
    }

    @Post()
    async createTimesheet(@Body() input: CreateTimesheetDto) {
        return await this.timesheetService.createTimesheet(input);
    }

    @Patch('detail/:id')
    async updateTimesheet(@Body() input: UpdateTimesheetDto, @Param('id') id: number) {
        return await this.timesheetService.updateTimesheet(input, id);
    }

    @Delete('detail/:id')
    @HttpCode(204)
    async removeTimesheet(@Param('id') id: number) {
        return await this.timesheetService.removeTimesheet(id);
    }

    @Patch('/approved/')
    async approveTimesheet() {
        return await this.timesheetService.approveTimesheet()
    }

    @Get('day')
    async getTimesheetByDay(@Body() date: Date){
        return await this.timesheetService.getTimeSheetByDay(date)
    }

}
