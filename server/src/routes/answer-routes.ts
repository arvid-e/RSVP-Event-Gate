
import AnswerModel from '../models/answer-model';
import { MongoDBAnswerRepository } from '../repositories/mongodb-repository';
//import { AnswerService } from '../services/answer-service';
import { Router } from 'express';
import { EventController } from '../controllers/answer-controller';

const router = Router();
const eventRepository = new EventRepository(EventModel);
const eventService = new EventService(eventRepository);
const controller = new EventController(eventService);

router.get('/', controller.getAllEvents);

router.post('/', controller.createEvent);

router.get('/:id', controller.getEventById);

router.patch('/:id', controller.editEvent);

router.delete('/:id', controller.deleteEvent);

export default router;
