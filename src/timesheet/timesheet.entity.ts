
import { Project } from "src/project/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column()
  note: string;

  @Column()
  date: Date;

  @OneToOne(() => Project, (project) => project.timesheet, {
    cascade: true
  })
  @JoinColumn()
  project: Project;

  @OneToOne(() => User, (user) => user.timesheet, {
    cascade: true
  })
  @JoinColumn()
  user: User;
}