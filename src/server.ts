import express from 'express';
import { betsRoutes } from './bets.routes';
import { auctionsRoutes } from './auctions.routes';

const app = express();

app.use(express.json());

app.use('/bets', betsRoutes);
app.use('/auction', auctionsRoutes)

app.listen(3333, () => {
  console.log('Listening to project on port 3333');
});