import EventModel from '../models/event.model';
import {
  EventData,
  EventDataDocument,
  EventRepository,
  UpdateEventData,
} from '../types/event-types';

export class MongoDBEventRepository implements EventRepository {
  constructor(private eventModel: typeof EventModel) {}

  async findAllEvents(): Promise<EventDataDocument[]> {
    return await this.eventModel.find();
  }

  async findEventById(id: string): Promise<EventDataDocument | null> {
    const event = await this.eventModel.findById(id);
    if (event) {
      return event.toObject();
    }
    return event;
  }

  async createEvent(eventData: EventData): Promise<EventDataDocument> {
    return (await this.eventModel.create(eventData)).toObject();
  }

  async deleteEvent(_id: string): Promise<boolean> {
    const deleted = await this.eventModel.deleteOne({ _id });
    return deleted.deletedCount > 0;
  }

  async updateEvent(eventData: UpdateEventData): Promise<boolean> {
    const { _id, ...updateFields } = eventData;
    const updated = await this.eventModel.updateOne(
      { _id },
      { $set: updateFields }
    );
    return updated.modifiedCount > 0;
  }
}