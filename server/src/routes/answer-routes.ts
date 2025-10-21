import { Router } from 'express';
import { AnswerController } from '../controllers/answer-controller';
import AnswerModel from '../models/answer-model';
import { MongoDBAnswerRepository } from '../repositories/mongodb-answer-repository';
import { AnswerServiceImp } from '../services/answer-service';

const router = Router();
const mongoDBAnswerRepository = new MongoDBAnswerRepository(AnswerModel);
const answerService = new AnswerServiceImp(mongoDBAnswerRepository);
const controller = new AnswerController(answerService);

router.get('/', controller.getAllAnswers);

router.post('/', controller.createAnswer);

router.get('/:id', controller.getAnswerById);

router.patch('/:id', controller.updateAnswer);

router.delete('/:id', controller.deleteAnswer);

export default router;
