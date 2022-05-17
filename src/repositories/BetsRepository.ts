export interface BetInformation {
  value: number;
}

export interface BetsRepository {
  create: (data: BetInformation) => void;
}