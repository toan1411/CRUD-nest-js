import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './timesheet.entity';
import {LessThan, MoreThan, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/project.entity';
import { Status } from './dto/status.enum';


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

        const timesheet = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.project', 'project')
            .leftJoinAndSelect('timesheet.user', 'user').take(limit).skip(skip).where({ status: status }).getMany()

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
        .leftJoinAndSelect("timesheet.user","user")
        .select(['timesheet.name','timesheet.status','timesheet.note','timesheet.date'])
        .where({user: user}).getMany()
        if(!timeseheet){
            throw new NotFoundException('Timesheet Not Found')
        }
        return timeseheet;
    }

    async createTimesheet(input) {
        const user = await this.userRepository.findOne({ where: { id: input.idOfUser } })
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        const project = await this.projectRepository.findOne({ where: { id: input.idOfProject } })
        if (!project) {
            throw new NotFoundException('Project Not Found')
        }
        const saved = await this.timesheetRepository.save({ ...input, project: project, user: user })

        if (!saved) {
            throw new BadRequestException('Saving failed')
        }
        return saved
    }

    async updateTimesheet(input, id) {
        const timesheet = await this.timesheetRepository.findOne({ where: { id: id } });
        if (!timesheet) {
            throw new NotFoundException('Timesheet Not Found')
        }

        const saved = await this.timesheetRepository.save({ ...timesheet, ...input })
        if (!saved) {
            throw new BadRequestException('Saving failed')
        }

        return saved
    }

    async removeTimesheet(id: number) {
        const timesheet = await this.timesheetRepository.findOne({ where: { id: id } });
        const removed = await this.timesheetRepository.remove(timesheet);
        if (!removed) {
            throw new BadRequestException('Delete failed')
        }
    }

    async submitTimesheet(user: User){
        const timesheet = await this.timesheetRepository.createQueryBuilder("timesheet")
                        .leftJoinAndSelect("timesheet.user","user")
                        .select(['timesheet.name','timesheet.status','timesheet.note','timesheet.date'])
                        .where({user: user}).getMany()
        if(!timesheet){
            throw new NotFoundException('Timesheet Not Found')
        }
        const timesheetSaved = await this.timesheetRepository.save({...timesheet, status : Status.Pending})
        if(!timesheetSaved){
            throw new BadRequestException('Submit failed!!!')
        }
        return timesheetSaved;
    }

    async approveTimesheet() {
        const timesheets = await this.timesheetRepository.find({ where: { status: Status.Pending } })
        console.log(timesheets)
        if (!timesheets) {
            throw new NotFoundException('Timesheet Not Found')
        }
        for (const timesheet of timesheets) {
            timesheet.status = Status.Approved;
        }
        return timesheets
    }

    async getTimeSheetByDay(date) {
        const day = new Date(`${date.year}-${date.month}-${date.day}`)
        const timesheet = await this.timesheetRepository
                    .createQueryBuilder("timsheet")
                    .where({date: day.toISOString().substring(0, 10)})
                    .getMany();

        if(!timesheet){
            throw new NotFoundException('Timesheet Not Found')
        }
        return timesheet
    }

    async getTimesheetByWeek(date){
        const dateStart = new Date(`${date.yearStart}-${date.monthStart}-${date.dayStart}`);
        const dateEnd = new Date(`${date.yearEnd}-${date.monthEnd}-${date.dayEnd}`)
        if(dateEnd<dateStart){
            throw new BadRequestException("date start is greater than date end")
        }
        const timeseheet = await this.timesheetRepository.createQueryBuilder("timesheet")
                    .where({date: MoreThan( dateStart.toISOString().substring(0,10))})
                    .andWhere({date: LessThan(dateEnd.toISOString().substring(0,10))})
                    .getMany();
        if(!timeseheet){
            throw new NotFoundException('Timesheet Not Found')
        }
        return timeseheet;
    }
}
