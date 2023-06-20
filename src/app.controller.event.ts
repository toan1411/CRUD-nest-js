import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { CreateEventDTO } from './create-event.dto';
import { UpdateEventDTO } from './update-event.dto';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Controller('/event')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) { }
  @Get()
  async findAll() {
    return await this.repository.find();
  }
  @Get(':id')
  async findOne(@Param('id') id) {
    console.log(id)
    return await this.repository.findOne({ where: { id: id } });

  }
  @Post()
  async create(@Body(new ValidationPipe({ groups: ["create"] })) input: CreateEventDTO) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    })
  }
  @Patch(':id')
  async update(@Param('id') id, @Body(new ValidationPipe({ groups: ["upda"] })) input: UpdateEventDTO) {
    const event = await this.repository.findOne({ where: { id: id } });
    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when
    })
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findOne({ where: { id: id } });
    await this.repository.remove(event)
  }
}
