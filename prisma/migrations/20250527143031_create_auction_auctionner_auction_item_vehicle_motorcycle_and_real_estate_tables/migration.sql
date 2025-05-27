-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTORCYCLE');

-- CreateEnum
CREATE TYPE "RealEstateType" AS ENUM ('BUILT', 'UNBUILT');

-- CreateTable
CREATE TABLE "auctioneer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registration_code" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "websites" TEXT[],

    CONSTRAINT "auctioneer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auction" (
    "id" TEXT NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL,
    "openDate" TIMESTAMP(3)[],

    CONSTRAINT "auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionItem" (
    "id" TEXT NOT NULL,
    "auctionId" TEXT NOT NULL,
    "startingBid" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "observation" TEXT,
    "initialValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "AuctionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL,
    "type" "VehicleType" NOT NULL,
    "origin" TEXT NOT NULL,
    "mount" TEXT NOT NULL,
    "mileage" INTEGER NOT NULL,
    "hasKeys" BOOLEAN NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "yearModel" INTEGER NOT NULL,
    "forCirculation" BOOLEAN NOT NULL,
    "fuel" TEXT NOT NULL,
    "hasAirConditioning" BOOLEAN,
    "steeringType" TEXT,
    "hasSpareTire" BOOLEAN,
    "gearbox" TEXT,
    "hasArmor" BOOLEAN,
    "numberOfDoors" INTEGER,
    "class" TEXT NOT NULL,
    "auctionItemId" TEXT NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "real_estate" (
    "id" TEXT NOT NULL,
    "type" "RealEstateType" NOT NULL,
    "origin" TEXT NOT NULL,
    "isOccupied" BOOLEAN NOT NULL,
    "squareMetersTotalArea" DOUBLE PRECISION NOT NULL,
    "squareMetersBuiltArea" DOUBLE PRECISION NOT NULL,
    "squareMetersPrivateArea" DOUBLE PRECISION NOT NULL,
    "squareMetersFieldArea" DOUBLE PRECISION NOT NULL,
    "debits" DOUBLE PRECISION NOT NULL,
    "allowVisits" BOOLEAN NOT NULL,
    "lawsuit" BOOLEAN NOT NULL,
    "registration" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT,
    "kilometersDistanceToSubway" INTEGER,
    "auctionItemId" TEXT NOT NULL,

    CONSTRAINT "real_estate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auctioneer_registration_code_key" ON "auctioneer"("registration_code");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_auctionItemId_key" ON "vehicle"("auctionItemId");

-- CreateIndex
CREATE UNIQUE INDEX "real_estate_auctionItemId_key" ON "real_estate"("auctionItemId");

-- AddForeignKey
ALTER TABLE "AuctionItem" ADD CONSTRAINT "AuctionItem_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "auction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_auctionItemId_fkey" FOREIGN KEY ("auctionItemId") REFERENCES "AuctionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "real_estate" ADD CONSTRAINT "real_estate_auctionItemId_fkey" FOREIGN KEY ("auctionItemId") REFERENCES "AuctionItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
