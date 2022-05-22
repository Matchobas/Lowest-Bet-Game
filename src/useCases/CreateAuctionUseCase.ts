import { AppError } from "../errors/AppError";
import { AuctionsRepository } from "../repositories/AuctionsRepository";

interface AuctionRequestData {
  itemName: string;
  endDate: Date;
}

class CreateAuctionUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({itemName, endDate}: AuctionRequestData) {
    const date = new Date(endDate);

    if (date.getTime() < Date.now()) {
      throw new AppError('Invalid end of auction date');
    }

    const auction = await this.auctionsRepository.create({
      itemName,
      endDate
    });

    return auction;
  }
}

export { CreateAuctionUseCase }