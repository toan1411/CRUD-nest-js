import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "../auth/auth.service";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Project } from "src/project/project.entity";
interface IOptions {
    page: number,
    limit: number,
    jobTitble: string,
}


@Injectable()
export class UserService {
    constructor(private readonly authService: AuthService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) { }

    async listUser(options: IOptions) {
        const take = options.limit || 100;
        const page = options.page || 1;
        const skip = (take * (page - 1));

        const user = await this.userRepository.find({ take: take, skip: skip, where: { jobTitble: options.jobTitble } });
        if (!user.length) {
            throw new BadRequestException('List user is empty')
        }
        return user;
    }



    async createUser(createUserDTO: CreateUserDTO) {
        const user = new User();

        const project = await this.projectRepository.findOne({ where: { id: createUserDTO.idOfProject } })

        if (!project) {
            throw new NotFoundException("Project Not Found")
        }

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
        user.sex = createUserDTO.sex;
        user.phoneNumber = createUserDTO.phoneNumber;
        user.isActive = createUserDTO.isActive;
        user.jobTitble = createUserDTO.jobTitble;
        user.project = project;
        const savedUser = await this.userRepository.save(user);
        if (savedUser) {
            return {
                ...(savedUser),
                token: this.authService.getTokenForUser(user)
            }
        } else {
            throw new BadRequestException('Saving failed')
        }
    }

    async updateUser(id: number, input: CreateUserDTO) {
        const user = await this.userRepository.findOne({ where: { id: id } })
        if (!user) {
            throw new NotFoundException('User Not Found')
        }

        const userUpdated = await this.userRepository.save({
            ...user, ...input
        })
        if (!userUpdated) {
            throw new BadRequestException('Saving Failed')
        }

    }
}