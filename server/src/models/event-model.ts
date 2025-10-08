import { Schema, model } from 'mongoose';
import { AnswerEventDataDocument } from '../types/event-types';

const eventSchema = new Schema<AnswerEventDataDocument>({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
    },
}, {
    timestamps: true, 
});

const EventModel = model<AnswerEventDataDocument>('Event', eventSchema);
export default EventModel;