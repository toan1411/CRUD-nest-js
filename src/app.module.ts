import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { ClientModule } from './clients/client.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';
import { typeOrmConfigAsync } from "./typeOrm.config";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        AuthModule, UserModule, ClientModule, TaskModule, ProjectModule],
    controllers: [],
    providers: [],
})
export class AppModule { }