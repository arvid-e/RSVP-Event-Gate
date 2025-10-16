import {
  EventData,
  EventDataDocument,
  EventRepository,
  EventService,
  UpdateEventData,
} from '../types/event-types';

export class EventServiceImp implements EventService {
  constructor(private eventRepository: EventRepository) {}

  async getAllEvents(): Promise<EventDataDocument[]> {
    return this.eventRepository.findAllEvents();
  }

  async getEventById(id: string): Promise<EventDataDocument | null> {
    return this.eventRepository.findEventById(id);
  }

  async createEvent(EventData: EventData): Promise<EventDataDocument | null> {
    return this.eventRepository.createEvent(EventData);
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.eventRepository.deleteEvent(id);
  }

  async updateEvent(EventData: UpdateEventData): Promise<boolean> {
    return this.eventRepository.updateEvent(EventData);
  }
}
