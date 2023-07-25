import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "../../user/entities/user.entity";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);
    constructor(private readonly authService: AuthService) {
        super();
    }

    public async validate(username: string, password: string): Promise<User> {
        if (username.length <= 1) {
            throw new BadRequestException('Username must be longer than or equal to 5 characters')
        }
        const user = await this.authService.checkPassword(username, password)
        return user
    }
}