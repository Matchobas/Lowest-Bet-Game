import { Auction } from "@prisma/client";

export interface AuctionCreateData {
  itemName: string;
  endDate: Date;
}

export interface AuctionsRepository {
  create: (data: AuctionCreateData) => Promise<Auction>
}