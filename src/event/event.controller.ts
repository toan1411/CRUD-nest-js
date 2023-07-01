import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import {  EventDTO } from './event.dto';
import { EventService } from './event.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/user/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/event')
export class EventsController {
  constructor(private eventService: EventService) { }

  @Get()
  @ApiOperation({ summary: 'show all events' })
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
    const result = await this.eventService.getAllEvents(options);
    if (!result) {
      throw new NotFoundException("Don't found event")
    }
    return {
      data: result.data,
      total: result.total
    };
  }



  @Get(':id')
  @ApiParam({ name: "id" })
  @ApiOperation({ summary: 'show envent by id' })
  async findOne(@Param('id') id) {
    const event = await this.eventService.getEvent(id);
    return event

  }


  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  async create(@Body() input: EventDTO, @CurrentUser() user: User) {
    return this.eventService.createEvent(input, user);
  }

  @Patch(':id')
  @ApiParam({ name: "id" })
  @ApiBearerAuth()
  @ApiCreatedResponse()
  //@UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'update event' })
  async update(@Param('id') id, /*@Body(new ValidationPipe({ groups: ["update"] })) input*/ @Body() input:EventDTO, @CurrentUser() user: User) {
    // if (Object.keys(input).length === 0) {
    //   throw new BadRequestException("Input is empty")
    // }

    return this.eventService.updateEvent(id, input, user);
  }


  @Delete(':id')
  @HttpCode(204)
  @ApiParam({ name: "id" })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'remove event' })
  async remove(@Param('id') id, @CurrentUser() user: User) {
    return this.eventService.removeEvent(id, user);

  }
}
