import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import * as bcript from "bcrypt"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    private readonly logger = new Logger(LocalStrategy.name);
    
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){
        super();
    }

    public async validate(username: string, password: string): Promise<any>{
        const user = await this.userRepository.findOne({where: {username: username}});
        if(!user){
            throw new UnauthorizedException();
        }

        const isEqual = await bcript.compare(password,user.password)
        if(! isEqual){
            this.logger.debug(`Invalid credentials for user ${username}`);
            throw new UnauthorizedException();
        }
        return user
    }
    
}