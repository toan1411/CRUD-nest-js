import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ClientModule } from 'src/clients/client.module';

@Module({
    imports:[TypeOrmModule.forFeature([Project]),ClientModule],
    controllers:[ProjectController],
    providers:[ProjectService]
})
export class ProjectModule {}
