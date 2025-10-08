import { Router } from 'express';

import answerRouter from './answer-routes';

const router = Router();

router.use('/answers', answerRouter);

export default router;
