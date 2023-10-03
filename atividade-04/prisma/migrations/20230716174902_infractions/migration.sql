-- CreateEnum
CREATE TYPE "Level" AS ENUM ('LIGHT', 'MEDIUM', 'SEVERE', 'VERY_SEVERE');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "infractions" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "level" "Level" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "infractions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_licenseId_key" ON "users"("licenseId");

-- AddForeignKey
ALTER TABLE "infractions" ADD CONSTRAINT "infractions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
