import { Module } from '@nestjs/common';
import { ClientsController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client} from './client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientService],
  exports: [TypeOrmModule.forFeature([Client])]
})
export class ClientModule { }
