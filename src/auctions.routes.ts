import { Router } from 'express';

const auctionsRoutes = Router();

auctionsRoutes.post('/', (request, response) => {
  const { itemName, endDate } = request.body;
});

export { auctionsRoutes }