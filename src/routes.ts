import { Router } from 'express';
import { Bet } from './entities/Bet';
import { PrismaBetsRepository } from './repositories/Prisma/PrismaBetsRepository';

const betsRoutes = Router();

betsRoutes.post('/', async (request, response) => {
  const { value } = request.body;

  const prismaBetsRepository = new PrismaBetsRepository();
  await prismaBetsRepository.create({ value });

  return response.status(201).send();
});

betsRoutes.get('/', async (request, response) => {
  const prismaBetsRepository = new PrismaBetsRepository();
  const bets = await prismaBetsRepository.all();

  const noDuplicateBetsValues = bets.filter((bet) => {
    let count = 0;
    
    for (let i = 0; i < bets.length; i++) {
      if (bet.value === bets[i].value) {
        count++;
      }
    }

    if (count == 1) {
      return bet.value;
    }
  });

  const lower = noDuplicateBetsValues.sort()[0];

  return response.json({ lowest_value: lower });
});

export { betsRoutes };