/*
  Warnings:

  - Added the required column `meta_data` to the `auction_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction_item" ADD COLUMN     "meta_data" TEXT NOT NULL;
