/*
  Warnings:

  - You are about to drop the column `auctioneerId` on the `website` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `website` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "website" DROP CONSTRAINT "website_auctioneerId_fkey";

-- AlterTable
ALTER TABLE "website" DROP COLUMN "auctioneerId";

-- CreateTable
CREATE TABLE "auctioneer_website" (
    "auctioneerId" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,

    CONSTRAINT "auctioneer_website_pkey" PRIMARY KEY ("auctioneerId","websiteId")
);

-- CreateIndex
CREATE UNIQUE INDEX "website_url_key" ON "website"("url");

-- AddForeignKey
ALTER TABLE "auctioneer_website" ADD CONSTRAINT "auctioneer_website_auctioneerId_fkey" FOREIGN KEY ("auctioneerId") REFERENCES "auctioneer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auctioneer_website" ADD CONSTRAINT "auctioneer_website_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "website"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
