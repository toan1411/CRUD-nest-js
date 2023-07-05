import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) { }

    async getAllClients() {
        const client = await this.clientRepository.createQueryBuilder("client")
            .leftJoinAndSelect("client.projects", "project").getMany();
        if (!client) {
            throw new NotFoundException("Clients not found")
        }
        return client;
    }

    async createClient(input) {
        const created = await this.clientRepository.save({ ...input });

        if (!created) {
            throw new BadRequestException("saving failed")
        }
        return created;
    }

    async updateClient(id: number, input: UpdateClientDto) {
        const client = await this.clientRepository.findOne({ where: { id: id } });
        if (!client) {
            throw new NotFoundException("Client Not Found")
        };
        const saved = await this.clientRepository.save({
            ...client,
            ...input,
        });
        if (!saved) {
            throw new BadRequestException("Saving failed");
        }
        return saved;
    }
}
