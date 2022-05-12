import express from 'express';

const app = express();

app.use(express.json());

const bets: Number[] = [];

app.post('/bet', (request, response) => {
  const { value } = request.body;

  bets.push(value);

  return response.status(201).send();
});

app.get('/bet', (request, response) => {
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

app.listen(3333, () => {
  console.log('Listening to project on port 3333');
});