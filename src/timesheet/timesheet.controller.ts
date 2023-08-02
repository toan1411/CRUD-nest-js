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
import { SubmitDto } from './dto/submit.dto';
import { EvaluateDto } from './dto/evaluate.dtp';

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
    async getTimesheet(@CurrentUser() user : User) {
        return await this.timesheetService.getMyTimesheet(user)
    }

    @Post()
    @UseGuards(RoleGuard(Role.USER))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async createTimesheet(@Body() input: CreateTimesheetDto, @CurrentUser() user: User) {
        return await this.timesheetService.createTimesheet(input, user);
    }

    @Patch('update/:day')
    @UseGuards(RoleGuard(Role.USER))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateTimesheet(@Body() input: UpdateTimesheetDto, @CurrentUser() pm: User, @Param('day') day : string ) {
        return await this.timesheetService.updateTimesheet(input, pm, day);
    }

    @Delete('delete/:id')
    @HttpCode(204)
     @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async removeTimesheet(@Param('id') id: number, @CurrentUser() pm: User) {
        console.log(pm)
        return await this.timesheetService.removeTimesheet(id, pm);
    }

    @Post('submit')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async submitTimesheet(@CurrentUser() user: User, @Body() day: SubmitDto) {
        return await this.timesheetService.submitTimesheet(user, day)
    }

    @Get('approved')
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async evaluateTimesheet(@Body() date: EvaluateDto, @CurrentUser() user: User) {
        return await this.timesheetService.evaluateTimesheet(date, user)
    }

    @Get('day')
    @UseGuards(RoleGuard(Role.PM))
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async approvedTimeSheetByDay(@Body() date: SubmitDto, @CurrentUser() user: User) {
        return await this.timesheetService.approvedTimeSheetByDay(date, user)
    }

}
