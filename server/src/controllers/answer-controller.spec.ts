import { NextFunction, Request, Response } from 'express';
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { AnswerServiceImp } from '../services/answer-service';
import {
  AnswerData,
  AnswerDataDocument,
  UpdateAnswerData,
} from '../types/answer-types';
import { AnswerController } from './answer-controller';

type MockAnswerServiceImp = Mocked<AnswerServiceImp>;

const mockAnswers: AnswerData[] = [
  {
    name: 'Tester',
    email: 'tester@test.com',
    password: 'abcABC123##//',
    date: '2020/01/01',
  },
  {
    name: 'Tester2',
    email: 'tester2@test.com',
    password: 'abcABC123##//',
    date: '2020/02/02',
  },
];

const mockUpdateData: UpdateAnswerData = {
  _id: 'valid-id-123',
  name: 'tester',
  email: 'new@email.com',
};

const mockEventId = 'valid-event-id';
const mockCreationBody = {
  eventId: mockEventId,
  name: 'tester',
  email: 'test@example.com',
  password: 'abcABC123##',
  date: '2025-10-17',
};
const mockResponseData = {
  ...mockCreationBody,

  eventId: mockEventId,
} as unknown as AnswerDataDocument;

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
      mockAnswers as unknown as AnswerDataDocument[]
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

  describe('createAnswer()', () => {
    it('should create an answer and return a 201 success response', async () => {

      mockReq.params = { eventId: mockEventId };
      mockReq.body = mockCreationBody;

      mockAnswerService.createAnswer.mockResolvedValue(
        mockCreationBody as unknown as AnswerDataDocument
      );

      await answerController.createAnswer(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Answer created successfully!',
        data: { answer: mockResponseData },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('getAnswerById()', () => {
    it('should fetch one answer and return a 201 success response', async () => {
      const mockId = 'valid-id-123';
      mockReq.params = { id: mockId };

      mockAnswerService.getAnswerById.mockResolvedValue(
        mockAnswers[0] as unknown as AnswerDataDocument
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

    it('should return 404 on invalid id', async () => {
      const mockId = 'invalid-id-123';
      mockReq.params = { id: mockId };

      mockAnswerService.getAnswerById.mockResolvedValue(null);

      await answerController.getAnswerById(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAnswerService.getAnswerById).toHaveBeenCalledWith(mockId);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Answer not found.',
        data: { answer: null },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('deleteAnswer()', () => {
    it('should delete one answer and return a 200 success response', async () => {
      const mockId = 'valid-id-123';
      mockReq.params = { id: mockId };

      mockAnswerService.deleteAnswer.mockResolvedValue(true);

      await answerController.deleteAnswer(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAnswerService.deleteAnswer).toHaveBeenCalledWith(mockId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Answer deleted successfully!',
        data: { id: mockId },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 404 on invalid id', async () => {
      const mockId = 'invvalid-id-123';
      mockReq.params = { id: mockId };

      mockAnswerService.deleteAnswer.mockResolvedValue(false);

      await answerController.deleteAnswer(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAnswerService.deleteAnswer).toHaveBeenCalledWith(mockId);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Answer deletion failed.',
        data: { id: mockId },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('updateAnswer()', () => {
    it('should update one answer and return a 200 success response', async () => {
      const mockId = 'valid-id-123';
      mockReq.params = { id: mockId };
      mockReq.body = mockUpdateData;

      mockAnswerService.updateAnswer.mockResolvedValue(true);

      await answerController.updateAnswer(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAnswerService.updateAnswer).toHaveBeenCalledWith(
        mockUpdateData
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'success',
        message: 'Answer updated successfully!',
        data: { id: mockId },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 404 on unsuccessfull update', async () => {
      const mockId = 'invvalid-id-123';
      mockReq.params = { id: mockId };
      mockReq.body = mockUpdateData;

      mockAnswerService.updateAnswer.mockResolvedValue(false);

      await answerController.updateAnswer(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockAnswerService.updateAnswer).toHaveBeenCalledWith(
        mockUpdateData
      );
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Answer update failed.',
        data: { id: mockId },
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
