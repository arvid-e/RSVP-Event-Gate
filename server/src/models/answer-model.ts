import { Schema, model } from 'mongoose';
import { AnswerDataDocument } from '../types/answer-types';

const answerSchema = new Schema<AnswerDataDocument>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    link: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AnswerModel = model<AnswerDataDocument>('Event', answerSchema);
export default AnswerModel;
