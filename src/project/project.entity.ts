import { Transform, TransformFnParams } from "class-transformer";
import moment from "moment";
import { Client } from "src/clients/client.entity";
import { Task } from "src/task/task.entity";
import { UserProject } from "src/user-project/userProject.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    @Transform(({ value }: TransformFnParams) => moment(value).format('YYYY-MM-DD'))
    timeStart: string;

    @Column()
    @Transform(({ value }: TransformFnParams) => moment(value).format('YYYY-MM-DD'))
    timeEnd: string;

    @ManyToOne(() => Client, (client) => client.projects)
    client: Client;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[];

    @OneToMany(() => UserProject, (userProject)=> userProject.project)
    userProjects: UserProject[]
}