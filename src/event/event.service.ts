import { Injectable } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from './custom-expection/custom-expection-notFound';



@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>
  ) { }

  async getAllEvents(options) {
    const take = +options.limit || 100;
    const page = +options.page || 1;
    const skip = (take * (page - 1));
    const data = await this.repository.find({ take: take, skip: skip, select: options.fields, where: { address: options.address, name: options.name } });

    return {
      data: data,
      total: data.length
    }
  }

  async getEvent(id) {
    const event = await this.repository.findOne({ where: { id: id } })
    if(!event){
      throw new NotFoundException();
    }
    return event;

  }

  async createEvent(input: any) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    })
  }

  async updateEvent(id, input) {
    const event = await this.repository.findOne({ where: { id: id } });
    if(!event){
      throw new NotFoundException();
    }

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when
    })
  }

  async removeEvent(id) {
    const event = await this.repository.findOne({ where: { id: id } });
    if(!event){
      throw new NotFoundException();
    }
    await this.repository.remove(event)
  }
}
