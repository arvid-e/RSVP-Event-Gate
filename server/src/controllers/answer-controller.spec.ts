import { NextFunction, Request, Response } from 'express';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import {
  AnswerData,
  AnswerDataDocument,
  AnswerServiceImp,
} from '../types/answer-types';
import { AnswerController } from './answer-controller';

type MockAnswerServiceImp = Mocked<AnswerServiceImp>;

const mockAnswers: AnswerData[] = [
  { name: 'Tester', email: 'tester@test.com', date: '2020/01/01' },
  { name: 'Tester2', email: 'tester2@test.com', date: '2020/02/02' },
];

describe('AnswerServiceImp', () => {
  let answerService: MockAnswerServiceImp;
  let answerController: AnswerController;

  beforeEach(() => {
    vi.clearAllMocks();

    answerService = {
      getAllAnswers: vi.fn(),
      getAnswerById: vi.fn(),
      createAnswer: vi.fn(),
      deleteAnswer: vi.fn(),
      updateAnswer: vi.fn(),
    };

    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    answerController = new AnswerController(answerService);
  });

  it('findAllAnswers() should return an array of answers', async () => {

  });
});
