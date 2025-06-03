/*
  Warnings:

  - You are about to drop the column `meta_data` on the `auction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "auction" DROP COLUMN "meta_data",
ADD COLUMN     "metaDataId" TEXT;

-- CreateTable
CREATE TABLE "meta_data" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "meta_data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auction" ADD CONSTRAINT "auction_metaDataId_fkey" FOREIGN KEY ("metaDataId") REFERENCES "meta_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
