import { Request, Response } from 'express';

export class EventController {
  constructor(private answerService: AnswerServiceImp) {}

  public createEvent = (req: Request, res: Response): void => {};

  public getAllEvents = (req: Request, res: Response): void => {};

  public getEventById = (req: Request, res: Response): void => {};

  public updateEvent = (req: Request, res: Response): void => {};

  public deleteEvent = (req: Request, res: Response): void => {};
}
