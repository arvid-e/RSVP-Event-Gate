import {
  AnswerData,
  AnswerDataDocument,
  AnswerRepository,
  AnswerService,
  UpdateAnswerData,
} from '../types/answer-types';

export class AnswerServiceImp implements AnswerService {
  constructor(private eventRepository: AnswerRepository) {}

  async getAllEvents(): Promise<AnswerDataDocument[]> {
    return this.eventRepository.findAllEvents();
  }

  async getEventById(id: string): Promise<AnswerDataDocument | null> {
    return this.eventRepository.findById(id);
  }

  async createEvent(eventData: AnswerData): Promise<AnswerDataDocument | null> {
    return this.eventRepository.createEvent(eventData);
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.eventRepository.deleteEvent(id);
  }

  async updateEvent(eventData: UpdateAnswerData): Promise<boolean> {
    return this.eventRepository.updateEvent(eventData);
  }
}
