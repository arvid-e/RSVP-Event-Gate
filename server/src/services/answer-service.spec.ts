import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import {
  AnswerData,
  AnswerDataDocument,
  AnswerRepository,
  UpdateAnswerData,
} from '../types/answer-types';
import { AnswerServiceImp } from './answer-service';

type MockAnswerRepository = Mocked<AnswerRepository>;

const mockAnswers: AnswerData[] = [
  { name: 'Tester', email: 'tester@test.com', date: '2020/01/01', password: 'abcABC123///' },
  { name: 'Tester2', email: 'tester2@test.com', date: '2020/02/02', password: 'abcABC123///' },
];

describe('AnswerServiceImp', () => {
  let mockRepository: MockAnswerRepository;
  let answerService: AnswerServiceImp;

  beforeEach(() => {
    vi.clearAllMocks();

    mockRepository = {
      findAllAnswers: vi.fn(),
      findAnswerById: vi.fn(),
      createAnswer: vi.fn(),
      deleteAnswer: vi.fn(),
      deleteAllAnswers: vi.fn(),
      updateAnswer: vi.fn(),
    };

    answerService = new AnswerServiceImp(mockRepository);
  });

  it('findAllAnswers() should return an array of answers', async () => {
    mockRepository.findAllAnswers.mockResolvedValue(
      mockAnswers as AnswerDataDocument[]
    );

    const result = await answerService.getAllAnswers();

    expect(mockRepository.findAllAnswers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAnswers);
  });

  it('findAnswerById() should return one answer', async () => {
    const validId = 'valid-id-123';

    const expectedAnswer = mockAnswers[0];

    mockRepository.findAnswerById.mockResolvedValue(
      expectedAnswer as AnswerDataDocument | null
    );

    const result = await answerService.getAnswerById(validId);

    expect(mockRepository.findAnswerById).toHaveBeenCalledWith(validId);
    expect(mockRepository.findAnswerById).toHaveBeenCalledTimes(1);

    expect(result).toEqual(expectedAnswer);
  });

  it('findAnswerById() should return null if no answer is found', async () => {
    const invalidId = 'invalid-id-123';

    mockRepository.findAnswerById.mockResolvedValue(null);

    const result = await answerService.getAnswerById(invalidId);

    expect(mockRepository.findAnswerById).toHaveBeenCalledWith(invalidId);
    expect(result).toBeNull();
  });

  it('createAnswer() should return answer on successfull', async () => {
    const mockAnswer: AnswerData = {
      name: 'Tester',
      email: 'tester@test.com',
      date: '2020/01/01',
      password: 'abcABC123///'
    };

    mockRepository.createAnswer.mockResolvedValue(mockAnswer as AnswerDataDocument);

    const result = await answerService.createAnswer(mockAnswer);

    expect(mockRepository.createAnswer).toHaveBeenCalledWith(mockAnswer);
    expect(result).toEqual(mockAnswer);
  });

  it('createAnswer() should return null on unsuccessfull creation', async () => {
    const mockAnswer: AnswerData = {
      name: 'Tester',
      email: 'tester@test.com',
      date: '2020/01/01',
      password: 'abcABC123///'
    };

    mockRepository.createAnswer.mockResolvedValue(null);

    const result = await answerService.createAnswer(mockAnswer);

    expect(mockRepository.createAnswer).toHaveBeenCalledWith(mockAnswer);
    expect(result).toEqual(null);
  });

  it('deleteAnswer() should return true on successfull deletion', async () => {

    const validId = 'valid-id-123'

    mockRepository.deleteAnswer.mockResolvedValue(true);

    const result = await answerService.deleteAnswer(validId);

    expect(mockRepository.deleteAnswer).toHaveBeenCalledWith(validId);
    expect(result).toEqual(true);
  });

  it('deleteAnswer() should return false on usuccessfull deletion', async () => {

    const invalidId= 'invalid-id-123'

    mockRepository.deleteAnswer.mockResolvedValue(false);

    const result = await answerService.deleteAnswer(invalidId);

    expect(mockRepository.deleteAnswer).toHaveBeenCalledWith(invalidId);
    expect(result).toEqual(false);
  });

  it('updateAnswer() should return true on successfull update', async () => {

    const mockUpdate: UpdateAnswerData = {
      _id: 'valid-id-123',
      name: 'Tester',
    };

    mockRepository.updateAnswer.mockResolvedValue(true);

    const result = await answerService.updateAnswer(mockUpdate);

    expect(mockRepository.updateAnswer).toHaveBeenCalledWith(mockUpdate);
    expect(result).toEqual(true);
  });

  it('updateAnswer() should return false on unsuccessfull update', async () => {

    const mockUpdate: UpdateAnswerData = {
      _id: 'invalid-id-123',
    };

    mockRepository.updateAnswer.mockResolvedValue(false);

    const result = await answerService.updateAnswer(mockUpdate);

    expect(mockRepository.updateAnswer).toHaveBeenCalledWith(mockUpdate);
    expect(result).toEqual(false);
  });
});
