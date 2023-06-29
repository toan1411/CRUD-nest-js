import { Module } from "@nestjs/common";
import { EventModule } from "./event/event.module";
import { AuthModule } from "./auth/auth.module";
import { typeOrmConfigAsync } from "./typeOrmConfig";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";



@Module({
    imports: [
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        EventModule, AuthModule, UserModule],
    controllers: [],
    providers: [],
})
export class AppModule { }