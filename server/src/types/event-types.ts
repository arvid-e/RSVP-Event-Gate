import { Document } from 'mongoose';
import { AnswerData } from './answer-types';

export interface EventData {
  name: string;
  answers: AnswerData[];
  date: string;
}

export interface UpdateEventData {
  _id: string;
  name?: string;
  answers?: AnswerData[];
  date?: string;
}

export interface EventDataDocument
  extends EventData,
    Document {}

export interface EventRepository {
  findAllEvents(): Promise<EventDataDocument[]>;
  findEventById(id: string): Promise<EventDataDocument | null>;
  createEvent(eventData: EventData): Promise<EventDataDocument | null>;
  deleteEvent(id: string): Promise<boolean>;
  updateEvent(eventData: UpdateEventData): Promise<boolean>;
}

export interface EventService {
  getAllEvents(): Promise<EventDataDocument[]>;
  getEventById(id: string): Promise<EventDataDocument | null>;
  createEvent(eventData: EventData): Promise<EventDataDocument | null>;
  deleteEvent(id: string): Promise<boolean>;
  updateEvent(eventData: UpdateEventData): Promise<boolean>;
}
