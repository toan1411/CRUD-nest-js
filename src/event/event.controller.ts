import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateEventDTO } from './create-event.dto';
import { EventService } from './event.service';
import { ApiCreatedResponse, ApiParam, ApiQuery } from '@nestjs/swagger';


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
  @Post()
  async create(@Body(new ValidationPipe({ groups: ["create"] })) input: CreateEventDTO) {
    if (!input) {
      throw new BadRequestException("Input is empty")
    }
    return this.eventService.createEvent(input);

  }

  @Patch(':id')
  @ApiParam({ name: "id" })
  @ApiCreatedResponse()
  async update(@Param('id') id, @Body(new ValidationPipe({ groups: ["update"] })) input) {
    if (Object.keys(input).length === 0) {
      throw new BadRequestException("Input is empty")
    }
    return this.eventService.updateEvent(id, input);
  }


  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: "id" })
  async remove(@Param('id') id) {
    return this.eventService.removeEvent(id);

  }
}
