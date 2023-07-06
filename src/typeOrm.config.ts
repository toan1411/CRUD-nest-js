import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { Client } from "./clients/client.entity"
import { User } from "./user/user.entity"
import { Project } from "./project/project.entity"
import { Task } from "./task/task.entity"


export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'mysql',
            port: parseInt(process.env.PORT),
            host: process.env.HOST,
            username: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            entities: [Client,User,Project,Task],
            migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
            cli: {
                migrationsDir: __dirname + '/../database/migrations',
              },
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            synchronize: false,
            logging: true
        }
    }
}

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    port: parseInt(process.env.PORT),
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [Client,User,Project,Task],
    migrations: [__dirname + '/./database/migrations/*.ts'],
    cli: {
        migrationsDir: __dirname + '/./database/migrations',
      },
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    logging: true
}

