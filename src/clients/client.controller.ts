import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientsController {
    constructor(private readonly clientService: ClientService) {
    }

    @Get()
    async getAllClients() {
        return this.clientService.getAllClients()
    }

    @Post()
    async createClient(@Body() input: CreateClientDto) {
        return this.clientService.createClient(input)
    }

    @Patch(":id")
    async updateClient(@Param('id') id: number, @Body() input: UpdateClientDto) {
        return this.clientService.updateClient(id, input)
    }
}
