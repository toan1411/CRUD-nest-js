import { Event } from "src/event/event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
    @Column({ unique: true })
    email: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;

    @OneToMany(()=>Event, (event)=>event.organizer)
    organized: Event[];

}