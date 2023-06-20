import { Module } from '@nestjs/common';
import { AppService } from './app.service.event';
import { EventsController } from './app.controller.event';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'events',
    entities: [Event],
    synchronize: true
  }),
  TypeOrmModule.forFeature([Event])
],
  controllers: [EventsController],
  providers: [AppService],
})
export class AppModule { }
