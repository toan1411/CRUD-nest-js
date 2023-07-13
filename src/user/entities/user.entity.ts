import { Project } from "src/project/project.entity";
import { Timesheet } from "src/timesheet/timesheet.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @Column( "set",{
        enum: Role,
        default: [Role.USER]
      })
    roles: Role[];

    @ManyToOne(()=>Project, (project)=>project.users)
    project: Project;

    @OneToMany(()=>Timesheet, (timesheet)=>timesheet.user)
    timesheets: Timesheet[];
}