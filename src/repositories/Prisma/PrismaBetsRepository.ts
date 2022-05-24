import { Bets } from "@prisma/client";
import { prisma } from "../../prisma";
import { BetInformation, BetsRepository } from "../BetsRepository";

class PrismaBetsRepository implements BetsRepository {
  async create({ auctionId, value, username }: BetInformation): Promise<Bets> {
    const bet = await prisma.bets.create({
      data: {
        auction_id: auctionId,
        value,
        user_name: username,
      }
    });

    return bet;
  };

  async all(): Promise<Bets[]> {
    const bets = await prisma.bets.findMany();

    return bets;
  };

  async findById(id: string): Promise<Bets | null> {
    const bet = await prisma.bets.findUnique({
      where: { id: id },
      include: { auction: true }
    });

    return bet;
  }

  async findAllByAuctionId(auctionId: string): Promise<Bets[] | null> {
    const bets = await prisma.bets.findMany({
      where: { auction_id: auctionId }
    });

    return bets;
  }
}

export { PrismaBetsRepository };