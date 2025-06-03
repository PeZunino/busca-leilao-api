/*
  Warnings:

  - Added the required column `debits` to the `auction_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin` to the `auction_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction_item" ADD COLUMN     "debits" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "origin" TEXT NOT NULL;
