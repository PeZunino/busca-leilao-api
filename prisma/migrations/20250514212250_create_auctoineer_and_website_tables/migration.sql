-- CreateTable
CREATE TABLE "auctioneer" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrationCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "auctioneer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "auctioneerId" TEXT NOT NULL,

    CONSTRAINT "website_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auctioneer_email_key" ON "auctioneer"("email");

-- AddForeignKey
ALTER TABLE "website" ADD CONSTRAINT "website_auctioneerId_fkey" FOREIGN KEY ("auctioneerId") REFERENCES "auctioneer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
