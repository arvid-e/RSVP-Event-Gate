import { Request, Response } from 'express';
import { AnswerServiceImp } from '../services/answer-service';
import { AnswerData, UpdateAnswerData } from '../types/answer-types';
import { catchAsync } from '../utils/catch-asynch';

export class AnswerController {
  constructor(private answerService: AnswerServiceImp) {}

  public getAllAnswers = catchAsync(async (req: Request, res: Response) => {
    const answers = await this.answerService.getAllAnswers();

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
    const answer = await this.answerService.getAnswerById(answerId);

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
    if (!req.body) {
      res
        .status(400)
        .json({ status: 'error', message: 'Missing request object.' });
    }

    const answerData: AnswerData = req.body;

    if (
      !answerData ||
      !answerData.name ||
      !answerData.email ||
      !answerData.date
    ) {
      res.status(400).json({
        status: 'error',
        message: 'Missing required fields in request object.',
      });
    }

    const answer = await this.answerService.createAnswer(answerData);

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
    const deleted = await this.answerService.deleteAnswer(answerId);

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
        message: 'Answer deletion failed!',
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

    const edited = await this.answerService.updateAnswer(answerData);

    if (edited) {
      res.status(200).json({
        status: 'success',
        message: 'Answer updated successfully!',
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
