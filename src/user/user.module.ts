import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User]),
        AuthModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [],
})
export class UserModule { }