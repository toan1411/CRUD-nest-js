import { Project } from "src/project/project.entity";
import { Timesheet } from "src/timesheet/timesheet.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    sex: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column()
    isActive: boolean;

    @Column()
    jobTitble: string;

    roles: Role[];

    @ManyToOne(()=>Project, (project)=>project.users)
    project: Project;

    @OneToOne(()=>Timesheet, (timeseheet)=>timeseheet.user)
    timesheet: Timesheet;


}