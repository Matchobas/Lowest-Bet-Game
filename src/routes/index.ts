import { Router } from 'express';
import { auctionsRoutes } from './auctions.routes';
import { betsRoutes } from './bets.routes';

const routes = Router();

routes.use('/bets', betsRoutes);
routes.use('/auction', auctionsRoutes);

export { routes }