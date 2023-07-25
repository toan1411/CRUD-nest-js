import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './timesheet.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/project.entity';
import { Status } from './dto/status.enum';
import { SubmitDto } from './dto/submit.dto';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Role } from 'src/user/entities/role.enum';
import { UserProject } from 'src/user-project/userProject.entity';
import { IsDate } from 'class-validator';
import { now } from 'moment';


@Injectable()
export class TimesheetService {
    constructor(
        @InjectRepository(Timesheet)
        private readonly timesheetRepository: Repository<Timesheet>,
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
        @InjectRepository(UserProject)
        private readonly userProjectRespository: Repository<UserProject>
    ) { }

    async getAllTimesheet(page: number, limit: number, status: string) {
        const skip = limit * (page - 1) || 0;
        let query = this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect("timesheet.userProject", "userProject")
            .leftJoinAndSelect("userProject.project", "project")
            .leftJoinAndSelect("userProject.user", "user")
            .take(limit).skip(skip)
        if (status) {
            query = query.where({ status: status })
        }
        const timesheet = await query.getMany();
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

    async getTimesheet(user: User) {
        // const timeseheet = await this.timesheetRepository.createQueryBuilder('timesheet')
        //     .leftJoinAndSelect("timesheet.users", "user")
        //     .select(['timesheet.name', 'timesheet.status', 'timesheet.note', 'timesheet.date'])
        //     .where({ users: [user] })
        //     .getMany()
        const timeseheet = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect("timesheet.userProject", "userProject")
            .leftJoinAndSelect("userProject.project", "project")
            .leftJoinAndSelect("userProject.user", "user")
            .getMany()
        if (!timeseheet) {
            throw new NotFoundException('Timesheet Not Found')
        }
        return timeseheet;
    }

    async createTimesheet(input: CreateTimesheetDto, user: User) {
        const project = await this.projectRepository.findOne({ where: { id: input.idOfProject } })
        if (!project) {
            throw new NotFoundException('Project Not Found')
        }

        const userProject = await this.userProjectRespository.createQueryBuilder('userProject')
            .leftJoinAndSelect('userProject.user', 'user')
            .leftJoinAndSelect('userProject.project', 'project')
            .where('user.username = :username', { username: user.username })
            .andWhere('project.name = :name', { name: project.name })
            .getOne()

        console.log(userProject)
        if (!userProject) {
            throw new BadRequestException('The user did not make this project')
        }
        const existTimesheet = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.userProject', 'userProject')
            .where('userProject.id = :id', { id: userProject.id })
            .andWhere('timesheet.date = :date', { date: new Date(Date.now()).toISOString().slice(0, 10) })
            .getMany()

        console.log(existTimesheet)
        if (existTimesheet.length !== 0) {
            throw new BadRequestException('Already exists at the timesheet')
        }
        try {
            const savedTimesheet = await this.timesheetRepository.save({
                ...input,
                date: new Date(Date.now()).toISOString().slice(0, 10), status: Status.New,
                userProject: userProject
            })
            return savedTimesheet
        } catch (error) {
            throw new BadRequestException('Saving failed')
        }
    }

    async updateTimesheet(input, user: User) {
        const timesheet = await this.timesheetRepository.createQueryBuilder("timesheet")
            .leftJoinAndSelect("timesheet.users", "user")
            .where('user.username =:username', { username: user.username })
            .getOne()
        if (!timesheet) {
            throw new NotFoundException('Timesheet Not Found')
        }
        try {
            const saved = await this.timesheetRepository.save({ ...timesheet, ...input })
            return saved
        } catch (error) {
            throw new BadRequestException('Saving failed')
        }
    }

    async removeTimesheet(id: number, user: User) {
        const timesheet = await this.timesheetRepository.findOne({ where: { id: id } })
        console.log(timesheet)
        if (!timesheet) {
            throw new NotFoundException("Timesheet Not Found")
        }
        try {
            this.timesheetRepository.remove(timesheet);
        } catch (error) {
            throw new BadRequestException('Delete failed')
        }
    }

    async submitTimesheet(user: User, inputSubmit: SubmitDto) {
        const startDay = new Date(inputSubmit.day)
        const endDay = new Date(startDay)
        endDay.setDate(startDay.getDate() + 6)
        const timesheets = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.userProject', 'userProject')
            .leftJoinAndSelect('userProject.project','project')
            .leftJoinAndSelect('userProject.user', 'user')
            .where('user.username = :username', { username: user.username })
            .andWhere('project.id = :id',{id:inputSubmit.idOfProject})
            .andWhere('timesheet.status = :status', { status: Status.New })
            .andWhere('timesheet.date > :startDay', { startDay: startDay.toISOString().slice(0, 10) })
            .andWhere('timesheet.date < :endDay', { endDay: endDay.toISOString().slice(0, 10) })
            .getMany()
        if (!timesheets) {
            return timesheets
        }
        for (const timesheet of timesheets) {
            timesheet.status = Status.Pending
        }
        try {
            const timesheetSaved = await this.timesheetRepository.save(timesheets)
            return timesheetSaved
        } catch (error) {
            throw new BadRequestException('Submit failed!!!')
        }
    }

    async approveTimesheetByWeek(inputSubmit: SubmitDto, user: User) {
        const startDay = new Date(inputSubmit.day)
        const endDay = new Date(startDay)
        endDay.setDate(endDay.getDate() + 6)
        const timesheets = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.userProject', 'userProject')
            .leftJoinAndSelect('userProject.project', 'project')
            .leftJoinAndSelect('userProject.user', 'user')
            .where('user.username = :username', { username: user.username })
            .andWhere('project.id = :id',{id : inputSubmit.idOfProject})
            .andWhere('timesheet.status = :status', { status: Status.Pending })
            .andWhere('timesheet.date > :startDay', { startDay: startDay.toISOString().slice(0, 10) })
            .andWhere('timesheet.date < :endDay', { endDay: endDay.toISOString().slice(0, 10) })
            .getMany()
        if (timesheets.length === 0) {
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

    async approvedTimeSheetByDay(date, user: User) {
        const day = new Date(`${date.year}-${date.month}-${date.day}`).toISOString().slice(0, 10);
        const timesheets = await this.timesheetRepository
            .createQueryBuilder("timesheet")
            .leftJoinAndSelect('timesheet.users', 'user')
            .where('user.username =:username', { username: user.username })
            .andWhere('timesheet.date =:date', { date: day })
            .andWhere({ status: Status.Pending })
            .getMany();

        if (!timesheets) {
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

    // async getTimesheetByWeek(date: Day) {
    //     const dateStart = new Date(`${date.yearStart}-${date.monthStart}-${date.dayStart}`);
    //     const dateEnd = new Date(`${date.yearEnd}-${date.monthEnd}-${date.dayEnd}`)
    //     if (dateEnd < dateStart) {
    //         throw new BadRequestException("date start is greater than date end")
    //     }
    //     const timesheet = await this.timesheetRepository.createQueryBuilder("timesheet")
    //         .where({ date: MoreThan(dateStart.toISOString().substring(0, 10)) })
    //         .andWhere({ date: LessThan(dateEnd.toISOString().substring(0, 10)) })
    //         .getMany();
    //     if (!timesheet) {
    //         throw new NotFoundException('Timesheet Not Found')
    //     }
    //     return timesheet;
    // }
}
