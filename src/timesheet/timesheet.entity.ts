
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./dto/status.enum";
import { Transform, TransformFnParams } from "class-transformer";
import moment from 'moment';
import { UserProject } from "src/user-project/userProject.entity";

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
  @Transform(({ value }: TransformFnParams) => moment(value).format('YYYY-MM-DD'))
  date: string;

  @ManyToOne(()=> UserProject, userProject => userProject.timesheets )
  @JoinColumn()
  userProject: UserProject

  @Column()
  workingTime: number

}