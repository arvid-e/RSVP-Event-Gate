import express from 'express';
import cors from 'cors';
import router from './routes/router';

export const app = express();

const corsOptions = {
    origin: 'https://your-frontend-site-name.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

