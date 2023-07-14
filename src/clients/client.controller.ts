import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import RoleGuard from 'src/auth/guard/role.guard';
import { Role } from 'src/user/entities/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('client')
@UseGuards(RoleGuard(Role.ADMIN))
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ClientsController {
    constructor(private readonly clientService: ClientService) {}

    @Get()
    @ApiQuery({name: 'page', required: false})
    @ApiQuery({name: 'limit', required: false})
    @ApiQuery({name: 'locale', required: false})
    async getAllClients(@Query('page') page : number, @Query('limit') limit : number, @Query('locale') locale : string) { 
        const options = {page: page, limit:limit, local: locale}
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

    @Delete(":id")
    @HttpCode(204)
    async removeClient(@Param('id') id : number){
        return this.clientService.removeClient(id);
    }
}
