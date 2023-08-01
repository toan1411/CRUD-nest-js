import { Project } from "src/project/project.entity";
import { Timesheet } from "src/timesheet/timesheet.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserProject {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, project => project.userProjects)
    @JoinColumn()
    project: Project;

    @ManyToOne(() => User, user => user.userProjects)
    @JoinColumn()
    user: User;

    @OneToMany(()=>Timesheet, timesheet =>timesheet.userProject)
    timesheets : Timesheet[]
}