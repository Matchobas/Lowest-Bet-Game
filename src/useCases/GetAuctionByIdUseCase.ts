import { AppError } from "../errors/AppError";
import { AuctionsRepository } from "../repositories/AuctionsRepository"

class GetAuctionByIdUseCase {
  
  private auctionRepository: AuctionsRepository;

  constructor(auctionRepository: AuctionsRepository) {
    this.auctionRepository = auctionRepository;
  } 
  
  async execute(id: string) {
    if(!id) {
      throw new AppError('This ID not correspond with any auction', 400);
    }

    const auction = await this.auctionRepository.findById(id);

    return auction;
  }
}

export { GetAuctionByIdUseCase }