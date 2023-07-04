import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    username: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    sex: string;
    @Column()
    password: string;
    @Column({ unique: true })
    email: string;
    @Column({ unique: true })
    phoneNumber: string;
    @Column()
    isActive: boolean;
    @Column()
    jobTitble: string;

}