import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";
import * as bcrypt from 'bcrypt'
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    logger: any;
    constructor(
        @Inject(ConfigService)
        private readonly configService: ConfigService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService) { }

    public getTokenForUser(user: User) {
        return this.jwtService.sign({
            username: user.username,
            sub: user.id
        })
    }

    public async checkPassword(username: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (!user) {
            throw new UnauthorizedException("Username or password not correctly");
        }

        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            this.logger.debug(`Invalid credentials for user ${username}`);
            throw new UnauthorizedException("Password not correctly");
        }
        return user;
    }

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, parseInt(this.configService.get('SALT_ROUNDS')));
    }
}