import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Event } from './event/event.entity';
import { User } from './auth/user.entity';

class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            port: parseInt(configService.get('PORT')),
            host: configService.get('HOST'),
            username: configService.get('USER'),
            password: configService.get('PASSWORD'),
            database: configService.get('DATABASE'),
            entities: [User, Event],
            synchronize: true
        }
    }
}


export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {

    imports: [ConfigModule],

    useFactory: async (configService: ConfigService) => TypeOrmConfig.getOrmConfig(configService),
    inject: [ConfigService]

}


