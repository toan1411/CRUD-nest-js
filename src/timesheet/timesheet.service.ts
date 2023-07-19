import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './timesheet.entity';
import {LessThan, MoreThan, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/project.entity';
import { Status } from './dto/status.enum';
import { Day } from './dto/day.dto';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Role } from 'src/user/entities/role.enum';

@Injectable()
export class TimesheetService {
    constructor(
        @InjectRepository(Timesheet)
        private readonly timesheetRepository: Repository<Timesheet>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    async getAllTimesheet(page: number, limit: number, status: string) {
        const skip = limit * (page - 1) || 0;
        let query = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.project', 'project')
            .leftJoinAndSelect('timesheet.users', 'user')
            .take(limit).skip(skip)
        if(status){
            query = query.where({status: status})
        }
        const timesheet= query.getMany();
        if (!timesheet) {
            throw new NotFoundException('Timesheet Not Found')
        }
        return timesheet
    }

    async getTimesheetById(id: number) {
        const timesheet = await this.timesheetRepository.findOne({ where: { id: id } })
        if (!timesheet) {
            throw new NotFoundException('Timesheet Not Found')
        }
        return timesheet;
    }

    async getTimesheet(user: User){
        const timeseheet = await this.timesheetRepository.createQueryBuilder('timesheet')
        .leftJoinAndSelect("timesheet.users","user")
        .select(['timesheet.name','timesheet.status','timesheet.note','timesheet.date'])
        .where({users: [user]})
        .getMany()
        if(!timeseheet){
            throw new NotFoundException('Timesheet Not Found')
        }
        return timeseheet;
    }

    async createTimesheet(input : CreateTimesheetDto ) {
        const user = await this.userRepository.findOne({ where: { id: input.idOfUser, roles: Role.USER } })
        if (!user) {
            throw new NotFoundException('Not User')
        }
        const userExist = await this.timesheetRepository.createQueryBuilder('timesheet')
                        .leftJoinAndSelect("timesheet.users","user")
                        .where('user.username = :username', {username: user.username}).getMany()
        if(userExist){
            throw new BadRequestException("The user exists in another timesheet")
        }
        const pm = await this.userRepository.findOne({where:{id: input.idOfPM, roles: Role.PM}})
        if(!pm){
            throw new NotFoundException('Not PM')
        }
        const project = await this.projectRepository.findOne({ where: { id: input.idOfProject } })
        if (!project) {
            throw new NotFoundException('Project Not Found')
        }    
        try {
            const saved = await this.timesheetRepository.save({ ...input, project: project,
                 users: [user, pm] ,date :new Date(Date.now()), status: Status.New})
            return saved
        } catch (error) {
            throw new BadRequestException('Saving failed')
        }
    }

    async updateTimesheet(input  , user : User) {
        const timesheet = await this.timesheetRepository.createQueryBuilder("timesheet")
                        .leftJoinAndSelect("timesheet.users","user")
                        .where('user.username =:username',{username: user.username})
                        .getOne()
        if (!timesheet) {
            throw new NotFoundException('Timesheet Not Found')
        }
        try {
            const saved = await this.timesheetRepository.save({...timesheet, ...input})
            return saved
        } catch (error) {
            throw new BadRequestException('Saving failed')
        }
    }

    async removeTimesheet(id: number) {
        const timesheet = await this.timesheetRepository.findOne({ where: { id: id } });
        if(!timesheet){
            throw new NotFoundException("Timeshet Not Found")
        }
        try {
            this.timesheetRepository.remove(timesheet);
        } catch (error) {
            throw new BadRequestException('Delete failed')
        }
    }

    async submitTimesheet(user: User){
        const timesheet = await this.timesheetRepository.createQueryBuilder("timesheet")
                        .leftJoinAndSelect("timesheet.users","user")
                        .where({status:Status.New})
                        .where('user.username =:username', {username : user.username}).getOne()
        
        if(!timesheet){
            return timesheet
        }
        try {
            const timesheetSaved = await this.timesheetRepository.save({...timesheet, status: Status.Pending})
            return timesheetSaved
        } catch (error) {
            throw new BadRequestException('Submit failed!!!')
        }
    }

    async approveTimesheetByWeek(date: Day, user : User) {
        const dateStart = new Date(`${date.yearStart}-${date.monthStart}-${date.dayStart}`);
        const dateEnd = new Date(`${date.yearEnd}-${date.monthEnd}-${date.dayEnd}`)
        if(dateEnd<dateStart){
            throw new BadRequestException("date start is greater than date end")
        }
        const timesheets = await this.timesheetRepository.createQueryBuilder("timesheet")
        .leftJoinAndSelect("timesheet.users","user")
        .where('user.username  IN (:username)',{username: user.username})
        .andWhere({status: Status.Pending})
        .getMany()
        if(!timesheets){
            throw new NotFoundException('Timesheet Not Found')
        }
        for (const timesheet of timesheets) {
            timesheet.status = Status.Approved;
        }
        try {
            const timesheetSaved = await this.timesheetRepository.save(timesheets)
            return timesheetSaved    
        } catch (error) {
            throw new BadRequestException('Approving Failed')
        }
    }

    async approvedTimeSheetByDay(date) {
        const day = new Date(`${date.year}-${date.month}-${date.day}`)
        const timesheets = await this.timesheetRepository
                    .createQueryBuilder("timsheet")
                    .where({date: day.toISOString().substring(0, 10)})
                    .andWhere({status: Status.Pending})
                    .getMany();

        if(!timesheets){
            throw new NotFoundException('Timesheet Not Found')
        }
        for (const timesheet of timesheets) {
            timesheet.status = Status.Approved;
        }
        try {
            const timesheetSaved = await this.timesheetRepository.save(timesheets)
            return timesheetSaved    
        } catch (error) {
            throw new BadRequestException('Approving Failed')
        } 
    }

    async getTimesheetByWeek(date){
        const dateStart = new Date(`${date.yearStart}-${date.monthStart}-${date.dayStart}`);
        const dateEnd = new Date(`${date.yearEnd}-${date.monthEnd}-${date.dayEnd}`)
        if(dateEnd<dateStart){
            throw new BadRequestException("date start is greater than date end")
        }
        const timesheet = await this.timesheetRepository.createQueryBuilder("timesheet")
                    .where({date: MoreThan( dateStart.toISOString().substring(0,10))})
                    .andWhere({date: LessThan(dateEnd.toISOString().substring(0,10))})
                    .getMany();
        if(!timesheet){
            throw new NotFoundException('Timesheet Not Found')
        }
        return timesheet;
    }
}
