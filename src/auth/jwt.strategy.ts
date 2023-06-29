import { PassportStrategy } from "@nestjs/passport";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRespository: Repository<User>,
    ) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                jgnoreExpiration: false,
                secretOrKey: process.env.AUTH_SECRET
            }
        );
    }

    async validate(payload: any) {

        return await this.userRespository.findOne({ where: {id:payload.sub}})
    }
}