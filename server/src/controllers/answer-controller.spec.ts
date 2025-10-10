import { NextFunction, Request, Response } from 'express';
import { beforeEach, describe, Mocked, vi } from 'vitest';
import { AnswerServiceImp } from '../services/answer-service';
import { AnswerData, AnswerDataDocument } from '../types/answer-types';
import { AnswerController } from './answer-controller';

type MockAnswerServiceImp = Mocked<AnswerServiceImp>;

const mockAnswers: AnswerData[] = [
  { name: 'Tester', email: 'tester@test.com', date: '2020/01/01' },
  { name: 'Tester2', email: 'tester2@test.com', date: '2020/02/02' },
];

let mockAnswerService: MockAnswerServiceImp;
let answerController: AnswerController;

let mockReq: Partial<Request>;
let mockRes: Partial<Response>;
let mockNext: NextFunction;

beforeEach(() => {
  vi.clearAllMocks();

  mockAnswerService = {
    getAllAnswers: vi.fn(),
    getAnswerById: vi.fn(),
    createAnswer: vi.fn(),
    deleteAnswer: vi.fn(),
    updateAnswer: vi.fn(),
  } as unknown as MockAnswerServiceImp;

  answerController = new AnswerController(mockAnswerService);

  mockNext = vi.fn();
  mockRes = {
    status: vi.fn(() => mockRes as Response),
    json: vi.fn(),
  };

  mockReq = {};
});

describe('getAllAnswers()', async () => {
  it('should fetch all answers and return a 200 success response', async () => {
    mockAnswerService.getAllAnswers.mockResolvedValue(
      mockAnswers as AnswerDataDocument[]
    );

    await answerController.getAllAnswers(
      mockReq as Request,
      mockRes as Response,
      mockNext
    );

    expect(mockAnswerService.getAllAnswers).toHaveBeenCalledTimes(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Answers fetched successfully!',
      data: { answers: mockAnswers },
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  describe('getAnswerById()', () => {
    it('should fetch one answer and return a 200 success response', async () => {
      const mockId = 'valid-id-123';
      mockReq.params = { id: mockId };

      mockAnswerService.getAnswerById.mockResolvedValue(
        mockAnswers[0] as AnswerDataDocument
      );

      await answerController.getAnswerById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAnswerService.getAnswerById).toHaveBeenCalledWith(mockId);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Answer fetched successfully!',
        data: { answer: mockAnswers[0] },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
