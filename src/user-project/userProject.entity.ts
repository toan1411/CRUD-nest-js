import { Project } from "src/project/project.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  
}