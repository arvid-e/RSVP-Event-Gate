import { Request, Response } from 'express';
import { AnswerServiceImp } from '../services/answer-service';
import { AnswerData, UpdateAnswerData } from '../types/answer-types';
import { catchAsync } from '../utils/catch-asynch';

export class AnswerController {
  constructor(private answerService: AnswerServiceImp) {}

  public getAllAnswers = catchAsync(async (req: Request, res: Response) => {
    const answers = await this.answerService.getAllEvents();

    res.status(200).json({
      status: 'success',
      message: 'Answers fetched successfully!',
      data: {
        answers,
      },
    });
  });

  public getAnswerById = catchAsync(async (req: Request, res: Response) => {
    const answerId = req.params.id;
    const answer = await this.answerService.getEventById(answerId);

    if (answer == null) {
      res.status(404).json({
        status: 'fail',
        message: 'Answer not found!',
        data: {
          answer,
        },
      });
    } else {
      res.status(201).json({
        status: 'success',
        message: 'Answer fetched successfully!',
        data: {
          answer,
        },
      });
    }
  });

  public createAnswer = catchAsync(async (req: Request, res: Response) => {
    const answerData: AnswerData = req.body;

    const answer = await this.answerService.createEvent(answerData);

    res.status(201).json({
      status: 'success',
      message: 'Answer created successfully!',
      data: {
        answer: answer,
      },
    });
  });

  public deleteAnswer = catchAsync(async (req: Request, res: Response) => {
    const answerId = req.params.id;
    const deleted = await this.answerService.deleteEvent(answerId);

    if (deleted) {
      res.status(200).json({
        status: 'success',
        message: 'Answer deleted successfully!',
        data: {
          id: answerId,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Event deletion failed!',
        data: {
          id: answerId,
        },
      });
    }
  });

  public updateAnswer = catchAsync(async (req: Request, res: Response) => {
    const answerId = req.params.id;
    const updateFields: UpdateAnswerData = req.body;

    const answerData: UpdateAnswerData = {
      ...updateFields,
    };

    const edited = await this.answerService.updateEvent(answerData);

    if (edited) {
      res.status(200).json({
        status: 'success',
        message: 'Answer edited successfully!',
        data: {
          id: answerId,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Answer edit failed!',
        data: {
          id: answerId,
        },
      });
    }
  });
}
