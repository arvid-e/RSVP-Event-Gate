import { Request, Response } from 'express';
import { EventServiceImp } from '../services/event-service';
import { EventData, UpdateEventData } from '../types/event-types';
import { catchAsync } from '../utils/catch-asynch';

export class EventController {
  constructor(private eventService: EventServiceImp) {}

  public getAllEvents = catchAsync(async (req: Request, res: Response) => {
    const events = await this.eventService.getAllEvents();

    res.status(200).json({
      status: 'success',
      message: 'Events fetched successfully!',
      data: {
        events,
      },
    });
  });

  public getEventById = catchAsync(async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const event = await this.eventService.getEventById(eventId);

    if (event == null) {
      res.status(404).json({
        status: 'fail',
        message: 'Event not found.',
        data: {
          event,
        },
      });
    } else {
      res.status(201).json({
        status: 'success',
        message: 'Event fetched successfully!',
        data: {
          event,
        },
      });
    }
  });

  public createEvent = catchAsync(async (req: Request, res: Response) => {
    const eventData: EventData = req.body;

    if (
      !eventData ||
      !eventData.formConfigId ||
      !eventData.name ||
      !eventData.date
    ) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required fields in request object.',
      });
    }

    const Event = await this.eventService.createEvent(eventData);

    res.status(201).json({
      status: 'success',
      message: 'Event created successfully!',
      data: {
        Event: Event,
      },
    });
  });

  public deleteEvent = catchAsync(async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const deleted = await this.eventService.deleteEvent(eventId);

    if (deleted) {
      res.status(200).json({
        status: 'success',
        message: 'Event deleted successfully!',
        data: {
          id: eventId,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Event deletion failed.',
        data: {
          id: eventId,
        },
      });
    }
  });

  public updateEvent = catchAsync(async (req: Request, res: Response) => {
    const eventId = req.params.id;
    const updateFields: UpdateEventData = req.body;

    const eventData: UpdateEventData = {
      ...updateFields,
    };

    const edited = await this.eventService.updateEvent(eventData);

    if (edited) {
      res.status(200).json({
        status: 'success',
        message: 'Event updated successfully!',
        data: {
          id: eventId,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Event update failed.',
        data: {
          id: eventId,
        },
      });
    }
  });
}
