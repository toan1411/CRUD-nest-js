import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Event } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDTO } from './create-event.dto';
import { User } from 'src/user/user.entity';



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
    if (!event) {
      throw new NotFoundException();
    }
    return event;

  }

  async createEvent(input: CreateEventDTO, user: User) {
    const savedEvent = await this.repository.save({
      ...input,
      organizer: user,
      when: new Date(input.when),
    })

    if (!savedEvent) {
      throw new BadRequestException("Saving faild")
    }
    return savedEvent;
  }

  async updateEvent(id, input, user) {
    const event = await this.repository.findOne({ where: { id: id } });
    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException("You are not authorized to change this event")
    }

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when
    })
  }

  async removeEvent(id, user) {
    const event = await this.repository.findOne({ where: { id: id } });
    if (!event) {
      throw new NotFoundException();
    }

    if (user.id !== event.organizerId) {
      throw new ForbiddenException("You are not authorized to remove this event")
    }
    await this.repository.remove(event)
  }
}
