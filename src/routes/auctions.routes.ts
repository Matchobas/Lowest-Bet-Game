import { Router } from 'express';
import { PrismaAuctionsRepository } from '../repositories/Prisma/PrismaAuctionsRepository';
import { CreateAuctionUseCase } from '../useCases/CreateAuctionUseCase';
import { GetAuctionByIdUseCase } from '../useCases/GetAuctionByIdUseCase';

const auctionsRoutes = Router();

auctionsRoutes.post('/', async (request, response) => {
  const { itemName, endDate } = request.body;

  const prismaAuctionsRepository = new PrismaAuctionsRepository();
  const createAuctionUseCase = new CreateAuctionUseCase(prismaAuctionsRepository);

  const auction = await createAuctionUseCase.execute({ itemName, endDate });

  return response.json(auction);
});

auctionsRoutes.get('/:auctionId', async (request, response) => {
  const { auctionId } = request.params;

  const prismaAuctionsRepository = new PrismaAuctionsRepository();
  const getAuctionByIdUseCase = new GetAuctionByIdUseCase(prismaAuctionsRepository);

  const auction = await getAuctionByIdUseCase.execute(String(auctionId));

  return response.json(auction);
});

export { auctionsRoutes }