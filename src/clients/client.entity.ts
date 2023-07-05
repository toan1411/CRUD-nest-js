import { Project } from "src/project/project.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    fristname: string;
    @Column()
    lastname: string;
    @Column()
    local: string;

    @OneToMany(()=>Project, (project)=> project.client)
    projects: Project[];
}