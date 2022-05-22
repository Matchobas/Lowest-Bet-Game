import { AppError } from "../errors/AppError";
import { AuctionsRepository } from "../repositories/AuctionsRepository";

interface AuctionRequestData {
  itemName: string;
  endDate: Date;
}

class CreateAuctionUseCase {
  constructor(private auctionsRepository: AuctionsRepository) {}

  async execute({itemName, endDate}: AuctionRequestData) {
    // Must increase hours, but must be an automatic way
    const date = new Date(endDate);
    date.setHours(date.getHours() + 3);

    if (date.getTime() < Date.now()) {
      throw new AppError('Invalid end of auction date');
    }

    const oneHourLater = new Date().setHours(date.getHours() + 1);

    if (oneHourLater > date.getTime()) {
      throw new AppError('The end must be at least one hour long from now');
    }

    const auction = await this.auctionsRepository.create({
      itemName,
      endDate
    });

    return auction;
  }
}

export { CreateAuctionUseCase }