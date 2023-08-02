import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './timesheet.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/project.entity';
import { Status } from './dto/status.enum';
import { SubmitDto } from './dto/submit.dto';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UserProject } from 'src/user-project/userProject.entity';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { EvaluateDto } from './dto/evaluate.dtp';


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

    async getMyTimesheet(user : User) {
        const timeseheets = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.userProject', 'userProject')
            .leftJoinAndSelect('userProject.user', 'user')
            .leftJoinAndSelect('userProject.project', 'project')
            .where('user.username = :username',{username: user.username})
            .getMany()
        if (timeseheets.length === 0) {
            throw new NotFoundException('Timesheet Not Found')
        }
        return timeseheets;
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

    async updateTimesheet(input: UpdateTimesheetDto, user: User, day: string) {
        const timesheet = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.userProject', 'userProject')
            .leftJoinAndSelect('userProject.user', 'user')
            .select(['timesheet.id', 'timesheet.note', 'timesheet.status', 'timesheet.workingTime'])
            .where('user.username = :username', { username: user.username })
            .where('timesheet.status != :status', { status: Status.Approved })
            .andWhere('timesheet.date = :date', { date: new Date(day).toISOString().slice(0, 10) })
            .getOne()

        if (!timesheet) {
            throw new NotFoundException('Timesheet Not Found')
        }
        try {
            const saved = await this.timesheetRepository.save({ ...timesheet, input })
            return saved
        } catch (error) {
            throw new BadRequestException('Saving failed')
        }
    }

    async removeTimesheet(id: number, user: User) {
        console.log(user)
        const timesheet = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.userProject', 'userProject')
            .leftJoinAndSelect('userProject.project', 'project')
            .leftJoinAndSelect('userProject.user', 'user')
            .where('user.username = :username', { username: user.username })
            .andWhere('timesheet.id = :id', { id: id })
            .getMany()
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
            .leftJoinAndSelect('userProject.project', 'project')
            .leftJoinAndSelect('userProject.user', 'user')
            .where('user.username = :username', { username: user.username })
            .andWhere('project.id = :id', { id: inputSubmit.idOfProject })
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

    async evaluateTimesheet(inputEvaluate: EvaluateDto, user: User, id : number) {
        const startDay = new Date(inputEvaluate.day)
        const endDay = new Date(startDay)
        endDay.setDate(endDay.getDate() + 6)
        const checkPm = await this.userProjectRespository.createQueryBuilder('userProject')
            .where('userProject.userId = :userID',{userID:user.id})
            .andWhere('userProject.projectId = :projectId',{projectId: inputEvaluate.idOfProject})
            .getOne()
        if(!checkPm){
            throw new BadRequestException('PM does not undertake the project')
        }
        const timesheets = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.userProject', 'userProject')
            .leftJoinAndSelect('userProject.user','user')
            .leftJoinAndSelect('userProject.project', 'project')
            .where('user.id = :idUser',{idUser: id})
            .andWhere('project.id = :idProject', { idProject: inputEvaluate.idOfProject })
            .andWhere('timesheet.status = :status', { status: Status.Pending })
            .andWhere('timesheet.date > :startDay', { startDay: startDay.toISOString().slice(0, 10) })
            .andWhere('timesheet.date < :endDay', { endDay: endDay.toISOString().slice(0, 10) })
            .getMany()
        if (timesheets.length === 0) {
            throw new NotFoundException('Timesheet Not Found')
        }
        if(inputEvaluate.status === Status.Approved){
            for (const timesheet of timesheets) {
                timesheet.status = Status.Approved;
            }
        }else{
            for (const timesheet of timesheets) {
                timesheet.status = Status.REJECTED;
                timesheet.workingTime = 0;
            }
        }
        const totalWorkingTime = timesheets.reduce((acc,timesheet)=>{
            return acc + timesheet.workingTime;
        },0)
        
        try {
            const timesheetSaved = await this.timesheetRepository.save(timesheets)
            return {
                timesheetSaved: timesheetSaved,
                totalWorkingTime: totalWorkingTime
            }
        } catch (error) {
            throw new BadRequestException('Approving Failed')
        }
    }

    async evaluateTimeSheetByDay(inputEvaluate: EvaluateDto, user: User) {
        const timesheets = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.userProject', 'userProject')
            .leftJoinAndSelect('userProject.user', 'user')
            .leftJoinAndSelect('userProject.project', 'project')
            .where('project.id = :id', { id: inputEvaluate.idOfProject })
            .andWhere('user.username = :username', { username: user.username })
            .andWhere('timesheet.date = :date', { date: new Date(inputEvaluate.day).toISOString().slice(0, 10) })
            .andWhere('timesheet.status = :status', { status: Status.Pending })
            .getMany()
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


}
