import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientsController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    async getAllClients(@Query('page') page : number, @Query('limit') limit : number, @Query('local') local : string) { 
        const options = {page: page, limit:limit, local: local}
        return this.clientService.getAllClients(options)
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
