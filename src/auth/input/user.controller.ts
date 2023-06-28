import { Repository } from "typeorm";
import { AuthService } from "../auth.service";
import { User } from "../user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, Body, Controller, Post} from "@nestjs/common";
import { CreateUserDTO } from "./create.user.dto";

@Controller('/user')
export class ControllerUser {
    constructor(private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }


    @Post()
    async CreateUser(@Body() createUserDTO: CreateUserDTO) {
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