/*
  Warnings:

  - You are about to drop the column `metaDataId` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `auction_item_id` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `auction_item_id` on the `field` table. All the data in the column will be lost.
  - You are about to drop the column `auction_item_id` on the `motorcycle` table. All the data in the column will be lost.
  - You are about to drop the column `auction_item_id` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the `meta_data` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[committee_id]` on the table `auction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "auction" DROP CONSTRAINT "auction_metaDataId_fkey";

-- DropForeignKey
ALTER TABLE "car" DROP CONSTRAINT "car_auction_item_id_fkey";

-- DropForeignKey
ALTER TABLE "field" DROP CONSTRAINT "field_auction_item_id_fkey";

-- DropForeignKey
ALTER TABLE "motorcycle" DROP CONSTRAINT "motorcycle_auction_item_id_fkey";

-- DropForeignKey
ALTER TABLE "real_estate" DROP CONSTRAINT "real_estate_auction_item_id_fkey";

-- DropIndex
DROP INDEX "car_auction_item_id_key";

-- DropIndex
DROP INDEX "field_auction_item_id_key";

-- DropIndex
DROP INDEX "motorcycle_auction_item_id_key";

-- DropIndex
DROP INDEX "real_estate_auction_item_id_key";

-- AlterTable
ALTER TABLE "auction" DROP COLUMN "metaDataId";

-- AlterTable
ALTER TABLE "auction_item" ADD COLUMN     "car_id" TEXT,
ADD COLUMN     "field_id" TEXT,
ADD COLUMN     "motorcycle_id" TEXT,
ADD COLUMN     "realEstate_id" TEXT;

-- AlterTable
ALTER TABLE "car" DROP COLUMN "auction_item_id";

-- AlterTable
ALTER TABLE "field" DROP COLUMN "auction_item_id";

-- AlterTable
ALTER TABLE "motorcycle" DROP COLUMN "auction_item_id";

-- AlterTable
ALTER TABLE "real_estate" DROP COLUMN "auction_item_id";

-- DropTable
DROP TABLE "meta_data";

-- CreateIndex
CREATE UNIQUE INDEX "auction_committee_id_key" ON "auction"("committee_id");

-- AddForeignKey
ALTER TABLE "auction_item" ADD CONSTRAINT "auction_item_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_item" ADD CONSTRAINT "auction_item_motorcycle_id_fkey" FOREIGN KEY ("motorcycle_id") REFERENCES "motorcycle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_item" ADD CONSTRAINT "auction_item_field_id_fkey" FOREIGN KEY ("field_id") REFERENCES "field"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auction_item" ADD CONSTRAINT "auction_item_realEstate_id_fkey" FOREIGN KEY ("realEstate_id") REFERENCES "real_estate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
