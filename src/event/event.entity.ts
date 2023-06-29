import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => User, (user) => user.organized)
    @JoinColumn({ name: 'organizerId' })
    organizer: User;

    @Column({ nullable: true })
    organizerId: number
}
