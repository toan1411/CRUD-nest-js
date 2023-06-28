import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LocalStrategy } from "./local.strategy";
import { User } from "./user.entity";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { jwtConfig } from "./auth.config";
import { JwtStrategy } from "./jwt.strategy";
import { ControllerUser } from "./input/user.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync(jwtConfig)
    ],
    providers: [LocalStrategy, JwtStrategy, AuthService],
    controllers: [AuthController, ControllerUser]
})
export class AuthModule { }