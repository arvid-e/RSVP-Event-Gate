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
    password: {

    },
    link: {
      type: String,
    },
    date: {
      type: String,
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',    
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const AnswerModel = model<AnswerDataDocument>('Answer', answerSchema);
export default AnswerModel;
