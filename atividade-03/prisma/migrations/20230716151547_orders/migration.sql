-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_PREPARATION', 'READY', 'CANCELLED');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "client" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_protocol_key" ON "Order"("protocol");
