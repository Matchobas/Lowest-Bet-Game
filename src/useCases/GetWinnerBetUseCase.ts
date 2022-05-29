import { Bets } from "@prisma/client";
import { AppError } from "../errors/AppError";
import { AuctionsRepository } from "../repositories/AuctionsRepository";
import { BetsRepository } from "../repositories/BetsRepository";

/**
 * Tópicos (17/05/2022):
 * função anÔnima (em alguns lugares chamada de função Lambda, mas não é a mesma coisa)
 * função auto executavel
 */

class GetWinnerBetUseCase {
  private betsRepository: BetsRepository;
  private auctionsRepository: AuctionsRepository;

  constructor(
    betsRepository: BetsRepository,
    auctionsRepository: AuctionsRepository
  ) {
    this.betsRepository = betsRepository;
    this.auctionsRepository = auctionsRepository;
  }
  
  async execute(auctionId: string): Promise<Bets | undefined> {
    const auction = await this.auctionsRepository.findById(auctionId);

    if (!auction) {
      throw new AppError("The informed ID does not correspond to any existing auction");
    }

    // if (auction.end_time > new Date()) {
    //   throw new AppError("There is still time until the bet is finished");
    // }

    const bets = await this.betsRepository.findAllByAuctionId(auctionId);

    if (!bets) {
      throw new AppError("No bets were made in this auction");
    }

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

    let lower = Infinity;

    noDuplicateBetsValues.forEach((bet) => {
      if (bet.value) {
        if (bet.value < lower) lower = bet.value;
      }
    });

    const winner = noDuplicateBetsValues.find((bet) => bet.value === lower);

    return winner;
  }
}

export { GetWinnerBetUseCase };