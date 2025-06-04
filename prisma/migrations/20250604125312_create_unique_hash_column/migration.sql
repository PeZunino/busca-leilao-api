/*
  Warnings:

  - A unique constraint covering the columns `[unique_hash]` on the table `auctioneer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unique_hash` to the `auctioneer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auctioneer" ADD COLUMN     "unique_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auctioneer_unique_hash_key" ON "auctioneer"("unique_hash");
