import { Bets } from "@prisma/client";

export interface BetInformation {
  value: number;
}

export interface BetsRepository {
  create: (data: BetInformation) => void;
  all: () => Promise<Bets[]>;
}