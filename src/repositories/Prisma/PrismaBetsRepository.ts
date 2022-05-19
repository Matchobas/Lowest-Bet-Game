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
    const bets = prisma.bets.findMany();

    return bets;
  };

  async findById(id: string): Promise<Bets | null> {
    const bet = await prisma.bets.findFirst({
      where: { id: id },
      include: { auction: true }
    });

    return bet;
  }
}

export { PrismaBetsRepository };