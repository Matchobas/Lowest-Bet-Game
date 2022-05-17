import { Router } from 'express';
import { PrismaBetsRepository } from './repositories/Prisma/PrismaBetsRepository';
import { GetWinnerBetUseCase } from './useCases/GetWinnerBetUseCase';

const betsRoutes = Router();

betsRoutes.post('/', async (request, response) => {
  const { value } = request.body;

  const prismaBetsRepository = new PrismaBetsRepository();
  await prismaBetsRepository.create({ value });

  return response.status(201).send();
});

betsRoutes.get('/', async (request, response) => {
  const prismaBetsRepository = new PrismaBetsRepository();
  const getWinnerBetUserCase = new GetWinnerBetUseCase(prismaBetsRepository);

  const winnerBet = await getWinnerBetUserCase.execute();

  return response.json({ lowest_value: winnerBet });
});

export { betsRoutes };