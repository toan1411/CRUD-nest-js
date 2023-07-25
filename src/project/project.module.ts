import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { Timesheet } from 'src/timesheet/timesheet.entity';
import { Client } from 'src/clients/client.entity';
import { UserProject } from 'src/user-project/userProject.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Project, Timesheet, Client, UserProject])],
    controllers:[ProjectController],
    providers:[ProjectService]
})
export class ProjectModule {}
