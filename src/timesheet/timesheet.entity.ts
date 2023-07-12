import { Project } from "src/project/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./dto/status.enum";

@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("set", {
    enum: Status,
    default: Status.New
  })
  status: Status;

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