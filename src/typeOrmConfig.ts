import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { User } from './user/user.entity';
import { Task } from "./task/task.entity";

class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            port: parseInt(configService.get('PORT')),
            host: configService.get('HOST'),
            username: configService.get('USER'),
            password: configService.get('PASSWORD'),
            database: configService.get('DATABASE'),
            entities: [User,Task],
            synchronize: true
        }
    }
}


export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {

    imports: [ConfigModule],

    useFactory: async (configService: ConfigService) => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService]

}


