import { Document } from 'mongoose';

export interface AnswerData {
  name: string;
  email: string;
  link: string;
  date: string;
}

export interface UpdateAnswerData {
  name?: string;
  email?: string;
  link?: string;
  date?: string;
}

export interface AnswerDataDocument
  extends AnswerData,
    Document {}

export interface EventRepository {
  findAllEvents(): Promise<AnswerDataDocument[]>;
  findById(id: string): Promise<AnswerDataDocument | null>;
  createEvent(eventData: AnswerData): Promise<AnswerDataDocument>;
  deleteEvent(id: string): Promise<boolean>;
  updateEvent(eventData: UpdateAnswerData): Promise<boolean>;
}

export interface EventService {
  getAllEvents(): Promise<AnswerDataDocument[]>;
  getEventById(id: string): Promise<AnswerDataDocument | null>;
  createEvent(eventData: AnswerData): Promise<AnswerDataDocument | null>;
  deleteEvent(id: string): Promise<boolean>;
  updateEvent(eventData: UpdateAnswerData): Promise<boolean>;
}
