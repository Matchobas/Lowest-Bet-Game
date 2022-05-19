/*
  Warnings:

  - Added the required column `auction_id` to the `bets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `bets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bets" ADD COLUMN     "auction_id" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auctions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
