import { Client } from "src/clients/client.entity";
import { Task } from "src/task/task.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    timeStart: Date;

    @Column()
    timeEnd: Date;

    @ManyToOne(() => Client, (client) => client.projects)
    client: Client;

    @OneToMany(()=>Task, (task)=>task.project)
    tasks : Task[];

    @OneToMany(()=>User, (user)=>user.project)
    users: User[];
}