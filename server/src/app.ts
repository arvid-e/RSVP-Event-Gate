import express from 'express';
import { errorHandler } from './middleware/error.middleware';
import router from './routes';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);
