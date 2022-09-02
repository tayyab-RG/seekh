import express, { Express, Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';
const swaggerDoc = require('./swagger.json');

import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import courseRouter from './routes/courseRoutes'
import enrollmentRoutes from './routes/enrollmentRoutes'

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript: CMS');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', courseRouter);
app.use('/', enrollmentRoutes);

var options = {
    explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));

export default app;