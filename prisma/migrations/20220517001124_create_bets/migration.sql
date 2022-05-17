-- CreateTable
CREATE TABLE "bets" (
    "value" REAL,
    "created_at" TIMESTAMP(6),
    "id" UUID NOT NULL,

    CONSTRAINT "bets_pk" PRIMARY KEY ("id")
);
