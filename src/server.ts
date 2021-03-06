import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import cors from 'cors';
import { AppError } from './errors/AppError';
import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', routes);

// Middleware to handle errors without the need to try catch in every route
// Not working
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.status).json({
      message: err.message
    });
  }

  return response.json({ message: err.message });
});

app.listen(3333, () => {
  console.log('Listening to project on port 3333');
});