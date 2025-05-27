/*
  Warnings:

  - You are about to drop the column `auctioneerId` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `committeeId` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `open_date` on the `auction` table. All the data in the column will be lost.
  - Added the required column `auctioneer_id` to the `auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `committee_id` to the `auction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "auction" DROP CONSTRAINT "auction_auctioneerId_fkey";

-- DropForeignKey
ALTER TABLE "auction" DROP CONSTRAINT "auction_committeeId_fkey";

-- AlterTable
ALTER TABLE "auction" DROP COLUMN "auctioneerId",
DROP COLUMN "committeeId",
DROP COLUMN "open_date",
ADD COLUMN     "auctioneer_id" TEXT NOT NULL,
ADD COLUMN     "committee_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "auction_opening" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auction_id" TEXT NOT NULL,

    CONSTRAINT "auction_opening_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_auctioneer_id_fkey" FOREIGN KEY ("auctioneer_id") REFERENCES "auctioneer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_committee_id_fkey" FOREIGN KEY ("committee_id") REFERENCES "committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_opening" ADD CONSTRAINT "auction_opening_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
