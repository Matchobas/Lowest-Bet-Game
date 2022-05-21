import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { betsRoutes } from './bets.routes';
import { auctionsRoutes } from './auctions.routes';

import { AppError } from './errors/AppError';

const app = express();

app.use(express.json());

app.use('/bets', betsRoutes);
app.use('/auction', auctionsRoutes);

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