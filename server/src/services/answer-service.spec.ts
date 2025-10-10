import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest';
import { AnswerData, AnswerDataDocument, AnswerRepository } from '../types/answer-types';
import { AnswerServiceImp } from './answer-service';

type MockAnswerRepository = Mocked<AnswerRepository>;

const mockAnswers: AnswerData[] = [
  { name: 'Tester', email: 'tester@test.com', date: '2020/01/01' },
  { name: 'Tester2', email: 'tester2@test.com', date: '2020/02/02' },
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
      updateAnswer: vi.fn(),
    };

    answerService = new AnswerServiceImp(mockRepository);
  });

  it('should call the repository and return the array of answers', async () => {
    mockRepository.findAllAnswers.mockResolvedValue(mockAnswers as AnswerDataDocument[]);

    const result = await answerService.getAllAnswers();

    expect(mockRepository.findAllAnswers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockAnswers);
  });
});
