import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Timesheet } from './timesheet.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Project } from 'src/project/project.entity';

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

    async getAllTimesheet(page: number, limit: number, status : string) {
        const skip = limit * (page - 1) || 0;

        const timesheet = await this.timesheetRepository.createQueryBuilder('timesheet')
            .leftJoinAndSelect('timesheet.project', 'project')
            .leftJoinAndSelect('timesheet.user', 'user').take(limit).skip(skip).where({status:status}).getMany()

        if (!timesheet) {
            throw new NotFoundException('Timesheet Not Found')
        }

        return timesheet
    }

    async getTimesheetById(id: number) {
        const timesheet = this.timesheetRepository.findOne({ where: { id: id } })
        if (!timesheet) {
            throw new NotFoundException('Timesheet Not Found')
        }
        return timesheet;
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
}
