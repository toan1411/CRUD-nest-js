import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import RoleGuard from 'src/auth/guard/role.guard';
import { Role } from 'src/user/entities/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Day } from './dto/day.dto';


@Controller('timesheet/')
export class TimesheetController {
    constructor(private readonly timesheetService: TimesheetService) { }

    @Get()
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth() 
    async getAllTimesheet(@Query('page') page: number, @Query('limit') limit: number, @Query('status') status: string) {
        return await this.timesheetService.getAllTimesheet(page, limit, status);
    }

    @Get('detail/byId/:id')
    @UseGuards(RoleGuard(Role.ADMIN))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getTimesheetByID(@Param('id') id: number) {
        return await this.timesheetService.getTimesheetById(id);
    }

    @Get('detail/myTimesheet/a')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth() 
    async getTimesheet(@CurrentUser() user: User) {
        return await this.timesheetService.getTimesheet(user)
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async createTimesheet(@Body() input: CreateTimesheetDto) {
        return await this.timesheetService.createTimesheet(input);
    }

    @Patch('update/:id')
    @UseGuards(RoleGuard(Role.USER))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateTimesheet(@Body() input: UpdateTimesheetDto, @CurrentUser() user: User) {
        return await this.timesheetService.updateTimesheet(input, user);
    }

    @Delete('delete/:id')
    @HttpCode(204)
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async removeTimesheet(@Param('id') id: number) {
        return await this.timesheetService.removeTimesheet(id);
    }

    @Post('submit')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async submitTimesheet(@CurrentUser() user: User){
        return await this.timesheetService.submitTimesheet(user)
    }

    @Get('approved')
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async approveTimesheet(@Body()date : Day, @CurrentUser()user :User) {
        return await this.timesheetService.approveTimesheetByWeek(date, user)
    }

    @Get('day')
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getTimesheetByDay(@Body() date: Date) {
        return await this.timesheetService.getTimesheetByWeek(date)
    }

    @Get('week')
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getTimesheetByWeek(@Body() date){
        return await this.timesheetService.getTimesheetByWeek(date)
    }
}
