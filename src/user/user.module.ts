import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Project } from "src/project/project.entity";


@Module({
    imports: [TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Project]),
        AuthModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [],
})
export class UserModule { }