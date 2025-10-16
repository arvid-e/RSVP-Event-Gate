import { Schema, model } from 'mongoose';
import { EventDataDocument } from '../types/event-types';

const eventSchema = new Schema<EventDataDocument>(
  {
    name: {
      type: String,
      required: true, 
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EventModel = model<EventDataDocument>('Event', eventSchema);
export default EventModel;