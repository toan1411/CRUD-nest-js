import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { typeOrmConfigAsync } from "./typeOrmConfig";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { ClientsModule } from './clients/clients.module';
import { TaskModule } from './task/task.module';



@Module({
    imports: [
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
         AuthModule, UserModule, ClientsModule, TaskModule],
    controllers: [],
    providers: [],
})
export class AppModule { }