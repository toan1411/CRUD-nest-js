import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    taskID: number;
    @Column()
    name: string;
    @Column()
    status: string;
    @Column()
    timeStart: string;
    @Column()
    timeEnd: string;
    @Column()
    note: string
}