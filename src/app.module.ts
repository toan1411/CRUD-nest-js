import { Module } from "@nestjs/common";
import { EventModule } from "./event/event.module";
import { AuthModule } from "./auth/auth.module";
import { typeOrmConfigAsync } from "./typeOrmConfig";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        EventModule,AuthModule],
    controllers:[],
    providers:[],
})
export class AppModule{}