import { Bets } from "@prisma/client";
import { BetsRepository } from "../repositories/BetsRepository";

/**
 * Tópicos (17/05/2022):
 * função anÔnima (em alguns lugares chamada de função Lambda, mas não é a mesma coisa)
 * função auto executavel
 */

class GetWinnerBetUseCase {
  private betsRepository: BetsRepository;

  constructor(betsRepository: BetsRepository) {
    this.betsRepository = betsRepository;
  }
  
  async execute(): Promise<Bets> {
    const bets = await this.betsRepository.all();

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

    return lower;
  }
}

export { GetWinnerBetUseCase };