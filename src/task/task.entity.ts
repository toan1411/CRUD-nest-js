import { Project } from "src/project/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    status: string;

    @Column()
    timeStart: Date;

    @Column()
    timeEnd: Date;
    
    @Column()
    note: string

    @ManyToOne(()=>Project,(project)=>project.tasks)
    project: Project
}