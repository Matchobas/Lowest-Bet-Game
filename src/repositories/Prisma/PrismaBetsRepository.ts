import { Bets } from "@prisma/client";
import { prisma } from "../../prisma";
import { BetInformation, BetsRepository } from "../BetsRepository";

class PrismaBetsRepository implements BetsRepository {
  async create({ value }: BetInformation): Promise<void> {
    await prisma.bets.create({
      data: {
        value,
      }
    });
  };

  async all(): Promise<Bets[]> {
    const bets = prisma.bets.findMany();

    return bets;
  };
}

export { PrismaBetsRepository };