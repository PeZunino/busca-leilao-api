/*
  Warnings:

  - Made the column `has_air_conditioning` on table `car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `steering_type` on table `car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_spare_tire` on table `car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gearbox` on table `car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_armor` on table `car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `number_of_doors` on table `car` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "car" ALTER COLUMN "has_air_conditioning" SET NOT NULL,
ALTER COLUMN "steering_type" SET NOT NULL,
ALTER COLUMN "has_spare_tire" SET NOT NULL,
ALTER COLUMN "gearbox" SET NOT NULL,
ALTER COLUMN "has_armor" SET NOT NULL,
ALTER COLUMN "number_of_doors" SET NOT NULL;
