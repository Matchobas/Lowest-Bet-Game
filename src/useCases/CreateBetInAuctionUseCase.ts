import { AppError } from "../errors/AppError";
import { AuctionsRepository } from "../repositories/AuctionsRepository";
import { BetsRepository } from "../repositories/BetsRepository";

interface BetRequestData {
  auctionId: string;
  value: number;
  username: string;
}

class CreateBetInAuctionUseCase {
  constructor(
    private betsRepository: BetsRepository,
    private auctionsRepository: AuctionsRepository 
  ) {}
  
  async execute({ auctionId, value, username }: BetRequestData) {
    const auction = await this.auctionsRepository.findById(auctionId);

    if (value <= 0) {
      throw new AppError("You can't bet a negative value or 0");
    }

    if (!auction) {
      throw new AppError("The informed ID does not correspond to any existing auction");
    }

    if (auction.end_time < new Date()) {
      throw new AppError("This auction already ended");
    }

    const bet = await this.betsRepository.create({
      auctionId,
      value,
      username
    });

    return bet;
  }
}

export {CreateBetInAuctionUseCase}