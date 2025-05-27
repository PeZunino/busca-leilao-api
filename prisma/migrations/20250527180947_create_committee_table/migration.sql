/*
  Warnings:

  - Added the required column `auctioneerId` to the `auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `committeeId` to the `auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction" ADD COLUMN     "auctioneerId" TEXT NOT NULL,
ADD COLUMN     "committeeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "committee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "committee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_auctioneerId_fkey" FOREIGN KEY ("auctioneerId") REFERENCES "auctioneer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
