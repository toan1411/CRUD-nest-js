
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config()
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {

    type: 'mysql',
    host: configService.get('HOST'),
    port: parseInt(configService.get('PORT_DATA')),
    username: configService.get('USER'),
    password: configService.get('PASSWORD'),
    database: configService.get('DATABASE'),
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    synchronize: false
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource




