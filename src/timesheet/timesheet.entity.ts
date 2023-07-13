import { Project } from "src/project/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./dto/status.enum";
import { Transform, TransformFnParams } from "class-transformer";
import moment from 'moment';

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

  @Transform(({ value }: TransformFnParams) => moment(value).format('DD/MM/YY'))
  @Column()
  date: Date;

  @ManyToOne(() => Project, (project) => project.timesheets)
  @JoinColumn()
  project: Project;

  @OneToOne(() => User, (user) => user.timesheet, {
    cascade: true
  })
  @JoinColumn()
  user: User;
}