import express from 'express';
import { betsRoutes } from './routes';

const app = express();

app.use(express.json());

app.use('/bets', betsRoutes);

app.listen(3333, () => {
  console.log('Listening to project on port 3333');
});