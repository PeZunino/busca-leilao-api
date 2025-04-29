-- CreateTable
CREATE TABLE "Auctioneer" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrationCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Auctioneer_pkey" PRIMARY KEY ("id")
);
