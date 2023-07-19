import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>
    ) { }

    async getAllClients(options) {
        const take = options.limit || 100;
        const skip = take * (options.page - 1) || 0;
        let query = this.clientRepository.createQueryBuilder("client")
            .leftJoinAndSelect("client.projects", "project").take(take).skip(skip)
        if (options.locale) {
            query = query.where("client.locale =:locale", { locale: options.locale })
        }
        const client = await query.getMany()
        if (!client) {
            throw new NotFoundException("Clients not found")
        }
        return client;
    }

    async createClient(input : CreateClientDto) {
        try {
            const created = await this.clientRepository.save({ ...input });
            return created;
        } catch (error) {
            throw new BadRequestException("saving failed")
        }
    }

    async updateClient(id: number, input: UpdateClientDto) {
        const client = await this.clientRepository.findOne({ where: { id: id } });
        if (!client) {
            throw new NotFoundException("Client Not Found")
        };
        try{
            const saved = await this.clientRepository.save({
                ...client,
                ...input,
            });
            return saved
        }catch(error){
            throw new BadRequestException("Saving failed");
        }
    }

    async removeClient(id: number) {
        const client = await this.clientRepository.findOne({ where: { id: id } });
        if (!client) {
            throw new NotFoundException("Client Not Found")
        }
        try{
             this.clientRepository.remove(client);
        }catch(error){
            throw new BadRequestException('Removing failed')
        }
    }
}
