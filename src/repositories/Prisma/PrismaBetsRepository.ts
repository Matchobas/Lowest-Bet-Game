import { prisma } from "../../prisma";
import { BetInformation, BetsRepository } from "../BetsRepository";

class PrismaBetsRepository implements BetsRepository{
  async create({ value }: BetInformation): Promise<void> {
    await prisma.bets.create({
      data: {
        value,
      }
    });
  };
}

export { PrismaBetsRepository };