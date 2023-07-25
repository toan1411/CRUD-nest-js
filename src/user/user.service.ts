import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UserProject } from "src/user-project/userProject.entity";
import { Project } from "src/project/project.entity";

interface IOptions {
    page: number,
    limit: number
}


@Injectable()
export class UserService {
    constructor(private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async listUser(options: IOptions) {
        const take = options.limit || 100;
        const page = options.page || 1;
        const skip = (take * (page - 1));

        const user = await this.userRepository.createQueryBuilder('user')
                    .leftJoinAndSelect("user.userProjects","userProject")
                    .leftJoinAndSelect("userProject.project", "project")
                    .take(take).skip(skip)
                    .getMany()
        return user
    }

    async createUser(createUserDTO: CreateUserDTO) {
        const user = new User();
        if (createUserDTO.password !== createUserDTO.retypePassword) {
            throw new BadRequestException('PassWord and retype password are not macth')
        }
        const existingUser = await this.userRepository.findOne({ where: [{ username: createUserDTO.username }, { email: createUserDTO.email }, { phoneNumber: createUserDTO.phoneNumber }] })
        if (existingUser) {
            throw new BadRequestException('username, phone number or email is already taken')
        }
        user.username = createUserDTO.username;
        user.password = await this.authService.hashPassword(createUserDTO.password);
        user.email = createUserDTO.email;
        user.firstName = createUserDTO.firstName;
        user.lastName = createUserDTO.lastName;
        user.sex = createUserDTO.sex;
        user.phoneNumber = createUserDTO.phoneNumber;
        user.isActive = createUserDTO.isActive;
        user.roles = createUserDTO.roles;
        try {
            const savedUser = await this.userRepository.save(user);
            return {
                ...(savedUser),
                token: this.authService.getTokenForUser(user)
            }
        } catch (error) {
            throw new BadRequestException('Saving failed')
        }
    }

    async updateUser(id: number, input: CreateUserDTO) {
        const user = await this.userRepository.findOne({ where: { id: id } })
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        try {
            const userUpdated = await this.userRepository.save({
                ...user, ...input
            })
            return userUpdated
        } catch (error) {
            throw new BadRequestException('Saving Failed')

        }
    }

    async removeUser(id: number) {
        const user = await this.userRepository.findOne({ where: { id: id } })
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        try {
            this.userRepository.remove(user)
        } catch (error) {
            throw new BadRequestException('Delete failed')
        }
    }
}