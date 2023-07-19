import { Project } from "src/project/project.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @ManyToMany(() => User, (user) => user.timesheets)
  @JoinColumn()
  users: User[];
}