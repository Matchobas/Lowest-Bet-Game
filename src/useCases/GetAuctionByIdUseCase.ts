import { Auction } from "@prisma/client";
import { AppError } from "../errors/AppError";
import { AuctionsRepository } from "../repositories/AuctionsRepository"

class GetAuctionByIdUseCase {
  
  private auctionRepository: AuctionsRepository;

  constructor(auctionRepository: AuctionsRepository) {
    this.auctionRepository = auctionRepository;
  } 
  
  async execute(id: string): Promise<Auction> {
    const auction = await this.auctionRepository.findById(id);

    if (!auction) {
      throw new AppError('This ID does not correspond to any existing auction', 400);
    }

    return auction;
  }
}

export { GetAuctionByIdUseCase }