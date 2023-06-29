import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [UserController],
    providers: [UserService, AuthService],
    exports: [],
})
export class UserModule { }