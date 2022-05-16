import { Router } from 'express';

const bets: Number[] = [];

const betsRoutes = Router();

betsRoutes.post('/', (request, response) => {
  const { value } = request.body;

  bets.push(value);

  return response.status(201).send();
});

betsRoutes.get('/', (request, response) => {
  const noDuplicateBets = bets.filter((bet) => {
    let count = 0;
    
    for (let i = 0; i < bets.length; i++) {
      if (bet === bets[i]) {
        count++;
      }
    }

    if (count == 1) {
      return bet;
    }
  });

  const lower = noDuplicateBets.sort()[0];

  return response.json({ lowest_value: lower });
});

export { betsRoutes };