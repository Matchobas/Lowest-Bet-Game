import { Bets } from "@prisma/client";

export interface BetInformation {
  auctionId: string;
  value: number;
  username: string;
}

export interface BetsRepository {
  create: (data: BetInformation) => Promise<Bets>;
  all: () => Promise<Bets[]>;
  findById: (id: string) => Promise<Bets | null>;
}