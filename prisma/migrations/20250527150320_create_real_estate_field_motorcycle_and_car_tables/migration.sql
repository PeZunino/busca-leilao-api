/*
  Warnings:

  - You are about to drop the column `openDate` on the `auction` table. All the data in the column will be lost.
  - You are about to drop the column `allowVisits` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the column `auctionItemId` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the column `isOccupied` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the column `kilometersDistanceToSubway` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the column `squareMetersBuiltArea` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the column `squareMetersFieldArea` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the column `squareMetersPrivateArea` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the column `squareMetersTotalArea` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `real_estate` table. All the data in the column will be lost.
  - You are about to drop the `AuctionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vehicle` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `auctioneer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[auction_item_id]` on the table `real_estate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `allow_visits` to the `real_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `auction_item_id` to the `real_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_garage` to the `real_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_occupied` to the `real_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_bedrooms` to the `real_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `square_meters_built_area` to the `real_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `square_meters_field_area` to the `real_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `square_meters_private_area` to the `real_estate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `square_meters_total_area` to the `real_estate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AuctionItem" DROP CONSTRAINT "AuctionItem_auctionId_fkey";

-- DropForeignKey
ALTER TABLE "real_estate" DROP CONSTRAINT "real_estate_auctionItemId_fkey";

-- DropForeignKey
ALTER TABLE "vehicle" DROP CONSTRAINT "vehicle_auctionItemId_fkey";

-- DropIndex
DROP INDEX "real_estate_auctionItemId_key";

-- AlterTable
ALTER TABLE "auction" DROP COLUMN "openDate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "open_date" TIMESTAMP(3)[],
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "real_estate" DROP COLUMN "allowVisits",
DROP COLUMN "auctionItemId",
DROP COLUMN "isOccupied",
DROP COLUMN "kilometersDistanceToSubway",
DROP COLUMN "squareMetersBuiltArea",
DROP COLUMN "squareMetersFieldArea",
DROP COLUMN "squareMetersPrivateArea",
DROP COLUMN "squareMetersTotalArea",
DROP COLUMN "type",
ADD COLUMN     "allow_visits" BOOLEAN NOT NULL,
ADD COLUMN     "auction_item_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "has_garage" BOOLEAN NOT NULL,
ADD COLUMN     "is_occupied" BOOLEAN NOT NULL,
ADD COLUMN     "kilometers_distance_to_subway" INTEGER,
ADD COLUMN     "number_of_bedrooms" INTEGER NOT NULL,
ADD COLUMN     "square_meters_built_area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "square_meters_field_area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "square_meters_private_area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "square_meters_total_area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- DropTable
DROP TABLE "AuctionItem";

-- DropTable
DROP TABLE "vehicle";

-- DropEnum
DROP TYPE "RealEstateType";

-- DropEnum
DROP TYPE "VehicleType";

-- CreateTable
CREATE TABLE "auction_item" (
    "id" TEXT NOT NULL,
    "starting_bid" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "observation" TEXT,
    "initial_value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "auction_id" TEXT NOT NULL,

    CONSTRAINT "auction_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "car" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "mount" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "has_keys" BOOLEAN NOT NULL,
    "license_plate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "year_model" INTEGER NOT NULL,
    "for_circulation" BOOLEAN NOT NULL,
    "fuel" TEXT NOT NULL,
    "has_air_conditioning" BOOLEAN,
    "steering_type" TEXT,
    "has_spare_tire" BOOLEAN,
    "gearbox" TEXT,
    "has_armor" BOOLEAN,
    "number_of_doors" INTEGER,
    "class" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "auction_item_id" TEXT NOT NULL,

    CONSTRAINT "car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "motorcycle" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "mount" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "has_keys" BOOLEAN NOT NULL,
    "license_plate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "year_model" INTEGER NOT NULL,
    "for_circulation" BOOLEAN NOT NULL,
    "fuel" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "auction_item_id" TEXT NOT NULL,

    CONSTRAINT "motorcycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "is_occupied" BOOLEAN NOT NULL,
    "square_meters_total_area" DOUBLE PRECISION NOT NULL,
    "square_meters_built_area" DOUBLE PRECISION NOT NULL,
    "square_meters_private_area" DOUBLE PRECISION NOT NULL,
    "square_meters_field_area" DOUBLE PRECISION NOT NULL,
    "debits" DOUBLE PRECISION NOT NULL,
    "allow_visits" BOOLEAN NOT NULL,
    "lawsuit" BOOLEAN NOT NULL,
    "registration" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT,
    "kilometers_distance_to_subway" INTEGER,
    "is_urban" BOOLEAN NOT NULL,
    "has_water_access" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "auction_item_id" TEXT NOT NULL,

    CONSTRAINT "field_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_auction_item_id_key" ON "car"("auction_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "motorcycle_auction_item_id_key" ON "motorcycle"("auction_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "field_auction_item_id_key" ON "field"("auction_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "auctioneer_name_key" ON "auctioneer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "real_estate_auction_item_id_key" ON "real_estate"("auction_item_id");

-- AddForeignKey
ALTER TABLE "auction_item" ADD CONSTRAINT "auction_item_auction_id_fkey" FOREIGN KEY ("auction_id") REFERENCES "auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car" ADD CONSTRAINT "car_auction_item_id_fkey" FOREIGN KEY ("auction_item_id") REFERENCES "auction_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "motorcycle" ADD CONSTRAINT "motorcycle_auction_item_id_fkey" FOREIGN KEY ("auction_item_id") REFERENCES "auction_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field" ADD CONSTRAINT "field_auction_item_id_fkey" FOREIGN KEY ("auction_item_id") REFERENCES "auction_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "real_estate" ADD CONSTRAINT "real_estate_auction_item_id_fkey" FOREIGN KEY ("auction_item_id") REFERENCES "auction_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
