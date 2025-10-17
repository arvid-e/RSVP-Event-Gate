import { Document, Types } from 'mongoose';

export interface AnswerData {
  name: string;
  email: string;
  password: string;
  link?: string;
  date: string;
  eventId: string;
}

export interface UpdateAnswerData {
  _id: string;
  name?: string;
  email?: string;
  password?: string;
  link?: string;
  date?: string;
}

export interface AnswerDataDocument extends Document {
  name: string;
  email: string;
  password: string;
  link?: string;
  date: string;
  eventId: Types.ObjectId;
}

export interface AnswerRepository {
  findAllAnswers(): Promise<AnswerDataDocument[]>;
  findAnswerById(id: string): Promise<AnswerDataDocument | null>;
  createAnswer(answerData: AnswerData): Promise<AnswerDataDocument | null>;
  deleteAnswer(id: string): Promise<boolean>;
  updateAnswer(answerData: UpdateAnswerData): Promise<boolean>;
}

export interface AnswerService {
  getAllAnswers(): Promise<AnswerDataDocument[]>;
  getAnswerById(id: string): Promise<AnswerDataDocument | null>;
  createAnswer(answerData: AnswerData): Promise<AnswerDataDocument | null>;
  deleteAnswer(id: string): Promise<boolean>;
  updateAnswer(answerData: UpdateAnswerData): Promise<boolean>;
}
