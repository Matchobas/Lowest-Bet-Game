import { Router } from 'express';
import { PrismaAuctionsRepository } from './repositories/Prisma/PrismaAuctionsRepository';

const auctionsRoutes = Router();

auctionsRoutes.post('/', async (request, response) => {
  const { itemName, endDate } = request.body;

  const prismaAuctionsRepository = new PrismaAuctionsRepository();

  // Não deixar criar caso a data de fim seja menor que a data atual
  const auction = await prismaAuctionsRepository.create({
    itemName,
    endDate
  });

  return response.json(auction);
});

auctionsRoutes.get('/', async (request, response) => {
  const { id } = request.body;

  const prismaAuctionsRepository = new PrismaAuctionsRepository();

  const auction = await prismaAuctionsRepository.findById(id);

  return response.json(auction);
});

export { auctionsRoutes }