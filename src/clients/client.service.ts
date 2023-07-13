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

    async getAllClients(options) {
        const take = options.limit||100;
        const skip = take*(options.page-1)||0;
        let clients;
        if(options.local){
            clients = await this.clientRepository.createQueryBuilder("client")
            .leftJoinAndSelect("client.projects", "project").take(take).skip(skip)
            .where("client.local =:local",{local: options.local}).getMany();
        }else{
            clients = await this.clientRepository.createQueryBuilder("client")
            .leftJoinAndSelect("client.projects", "project").take(take).skip(skip).getMany()
        }
        
        if (!clients) {
            throw new NotFoundException("Clients not found")
        }
        return clients;
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

    async removeClient(id: number){
        const client = await this.clientRepository.findOne({where:{id:id}});
        if(!client){
            throw new NotFoundException("Client Not Found")
        }
        const removed = await this.clientRepository.remove(client);
        if(!removed){
            throw new BadRequestException('Removing failed')
        }
    }
}
