import { Schema, model } from 'mongoose';
import { EventDataDocument } from '../types/event-types';

const eventSchema = new Schema<EventDataDocument>(
  {
    name: {
      type: String,
      required: true, 
    },
    formConfigId: { 
      type: String,
      required: true,
    },
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
    attendees: {
      type: [String],
      default: [],
    },
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