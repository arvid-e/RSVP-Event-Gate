import AnswerModel from '../models/answer-model';
import {
  AnswerData,
  AnswerDataDocument,
  AnswerRepository,
  UpdateAnswerData,
} from '../types/answer-types';

export class MongoDBAnswerRepository implements AnswerRepository {
  constructor(private answerModel: typeof AnswerModel) {}

  async findAllAnswers(): Promise<AnswerDataDocument[]> {
    return await this.answerModel.find();
  }

  async findAnswerById(id: string): Promise<AnswerDataDocument | null> {
    const answer = await this.answerModel.findById(id);
    if (answer) {
      return answer.toObject();
    }
    return answer;
  }

  async createAnswer(answerData: AnswerData): Promise<AnswerDataDocument> {
    console.log(answerData);
    return (await this.answerModel.create(answerData)).toObject();
  }

  async deleteAnswer(_id: string): Promise<boolean> {
    const deleted = await this.answerModel.deleteOne({ _id });
    return deleted.deletedCount > 0;
  }

  async updateAnswer(answerData: UpdateAnswerData): Promise<boolean> {
    const { _id, ...updateFields } = answerData;
    const updated = await this.answerModel.updateOne(
      { _id },
      { $set: updateFields }
    );
    return updated.modifiedCount > 0;
  }
}
