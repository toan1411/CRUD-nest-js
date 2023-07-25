
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { UserProject } from "src/user-project/userProject.entity";


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

    @Column( "set",{
        enum: Role,
        default: [Role.USER]
      })
    roles: Role[];

    
    @OneToMany(()=>UserProject,(userProject)=> userProject.user)
    userProjects: UserProject[];
}