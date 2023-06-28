import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 100 })
    name: string;
    @Column()
    description: string;
    @Column({ name: 'when-date' })
    when: Date;
    @Column()
    address: string;

    @ManyToOne(()=> User)
    organizer : User;
}
