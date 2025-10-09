import {
  AnswerData,
  AnswerDataDocument,
  AnswerRepository,
  AnswerService,
  UpdateAnswerData,
} from '../types/answer-types';

export class AnswerServiceImp implements AnswerService {
  constructor(private answerRepository: AnswerRepository) {}

  async getAllAnswers(): Promise<AnswerDataDocument[]> {
    return this.answerRepository.findAllAnswers();
  }

  async getAnswerById(id: string): Promise<AnswerDataDocument | null> {
    return this.answerRepository.findAnswerById(id);
  }

  async createAnswer(answerData: AnswerData): Promise<AnswerDataDocument | null> {
    return this.answerRepository.createAnswer(answerData);
  }

  async deleteAnswer(id: string): Promise<boolean> {
    return this.answerRepository.deleteAnswer(id);
  }

  async updateAnswer(answerData: UpdateAnswerData): Promise<boolean> {
    return this.answerRepository.updateAnswer(answerData);
  }
}
