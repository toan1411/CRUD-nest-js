import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateEventDTO } from './create-event.dto';
import { EventService } from './event.service';
import { ApiCreatedResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/event')
export class EventsController {
  constructor(private eventService: EventService) { }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'fields', type: [String], required: false })
  @ApiQuery({ name: 'address', required: false })
  @ApiQuery({ name: 'name', required: false })
  async findAll(@Query('page') page, @Query('limit') limit, @Query('fields') fields,
    @Query('address') address, @Query('name') name) {
    const options = {
      page,
      limit,
      fields,
      address,
      name
    };
    return {
      data: (await this.eventService.getAllEvents(options)).data,
      total: (await this.eventService.getAllEvents(options)).total
    };
  }



  @Get(':id')
  @ApiParam({ name: "id" })
  async findOne(@Param('id') id) {
    const event = await this.eventService.getEvent(id);
    return event

  }


  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() input: CreateEventDTO, @CurrentUser() user: User) {
    if (!input) {
      throw new BadRequestException("Input is empty")
    }
    return this.eventService.createEvent(input, user);

  }

  @Patch(':id')
  @ApiParam({ name: "id" })
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id, @Body(new ValidationPipe({ groups: ["update"] })) input, @CurrentUser() user: User) {
    if (Object.keys(input).length === 0) {
      throw new BadRequestException("Input is empty")
    }

    return this.eventService.updateEvent(id, input, user);
  }


  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: "id" })
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id, @CurrentUser() user: User) {
    return this.eventService.removeEvent(id, user);

  }
}
