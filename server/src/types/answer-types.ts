import { Document } from 'mongoose';

export interface AnswerData {
  name: string;
  email: string;
  link?: string;
  date: string;
}

export interface UpdateAnswerData {
  _id: string;
  name?: string;
  email?: string;
  link?: string;
  date?: string;
}

export interface AnswerDataDocument
  extends AnswerData,
    Document {}

export interface AnswerRepository {
  findAllAnswers(): Promise<AnswerDataDocument[]>;
  findAnswerById(id: string): Promise<AnswerDataDocument | null>;
  createAnswer(answerData: AnswerData): Promise<AnswerDataDocument>;
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
