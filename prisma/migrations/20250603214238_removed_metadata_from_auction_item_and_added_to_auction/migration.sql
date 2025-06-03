/*
  Warnings:

  - You are about to drop the column `meta_data` on the `auction_item` table. All the data in the column will be lost.
  - Added the required column `meta_data` to the `auction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auction" ADD COLUMN     "meta_data" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "auction_item" DROP COLUMN "meta_data";
