import { Auction } from "@prisma/client";
import { prisma } from "../../prisma";
import { AuctionCreateData, AuctionsRepository } from "../AuctionsRepository";

class PrismaAuctionsRepository implements AuctionsRepository {
  async create({ itemName, endDate }: AuctionCreateData): Promise<Auction> {
    const auction = await prisma.auction.create({
      data: {
        item_name: itemName,
        end_time: endDate,
      }
    });

    return auction;
  }

  async findById(id: string): Promise<Auction | null> {
    const auction = await prisma.auction.findUnique({
      where: { id: id },
      include: { bets: true },
    });

    return auction;
  }
}

export { PrismaAuctionsRepository }