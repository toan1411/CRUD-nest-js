import { Module } from '@nestjs/common';
import { UserProjectService } from './userProject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from './userProject.entity';
import { Project } from 'src/project/project.entity';
import { Timesheet } from 'src/timesheet/timesheet.entity';
import { User } from 'src/user/entities/user.entity';
import { UserProjectController } from './userProject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject, User, Project, Timesheet])],
  controllers: [UserProjectController],
  providers: [UserProjectService]
})
export class UserProjectModule { }
