import { Router } from 'express';
import { PrismaAuctionsRepository } from './repositories/Prisma/PrismaAuctionsRepository';
import { PrismaBetsRepository } from './repositories/Prisma/PrismaBetsRepository';
import { CreateBetInAuctionUseCase } from './useCases/CreateBetInAuctionUseCase';
import { GetWinnerBetUseCase } from './useCases/GetWinnerBetUseCase';

const betsRoutes = Router();

betsRoutes.post('/', async (request, response) => {
  const { auctionId, value, username } = request.body;

  const prismaBetsRepository = new PrismaBetsRepository();
  const prismaAuctionRepository = new PrismaAuctionsRepository();
  const createBetInAuctionUseCase = new CreateBetInAuctionUseCase(
    prismaBetsRepository,
    prismaAuctionRepository
  );

  const bet = await createBetInAuctionUseCase.execute({
    auctionId,
    value,
    username
  });

  return response.status(201).json(bet);
});

betsRoutes.get('/', async (request, response) => {
  const { id } = request.body;

  const prismaBetsRepository = new PrismaBetsRepository();

  const bet = await prismaBetsRepository.findById(id);

  return response.json(bet);
});

betsRoutes.get('/winner', async (request, response) => {
  const prismaBetsRepository = new PrismaBetsRepository();
  const getWinnerBetUserCase = new GetWinnerBetUseCase(prismaBetsRepository);

  const winnerBet = await getWinnerBetUserCase.execute();

  return response.json({ lowest_value: winnerBet });
});

export { betsRoutes };