import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalStrategy } from "./strategy/local.strategy";
import { User } from "../user/user.entity";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { jwtConfigAsync } from "./auth.config";
import { JwtStrategy } from "./strategy/jwt.strategy";


@Module({
    imports: [

        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync(jwtConfigAsync)
    ],
    providers: [LocalStrategy, AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule { }