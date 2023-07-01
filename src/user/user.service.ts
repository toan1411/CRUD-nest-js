import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./create-user.dto";
import { Event } from "src/event/event.entity";


@Injectable()
export class UserService {
    constructor(private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, 
        @InjectRepository(Event)
        private readonly eventRepository: Repository<Event>
    ) { }
    
    
    async getUserById(id){
        const user = await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.organized', 'event').where({id:id}).getMany();

        if(user.length === 0){
            throw new BadRequestException('User not found')
        }
        return user;
    }


    async CreateUser(createUserDTO: CreateUserDTO) {
        const user = new User();

        if (createUserDTO.password !== createUserDTO.retypePassword) {
            throw new BadRequestException('PassWord or UserName are not identical')
        }

        const existingUser = await this.userRepository.findOne({ where: [{ username: createUserDTO.username }, { email: createUserDTO.email }] })

        if (existingUser) {
            throw new BadRequestException('username or email is already taken')
        }

        user.username = createUserDTO.username;
        user.password = await this.authService.hashPassword(createUserDTO.password);
        user.email = createUserDTO.email;
        user.firstName = createUserDTO.firstName;
        user.lastName = createUserDTO.lastName;
        const savedUser = await this.userRepository.save(user);
        if (savedUser) {
            return {
                ...(savedUser),
                token: this.authService.getTokenForUser(user)
            }
        } else {
            throw new BadRequestException('saving failed')
        }
    }
}