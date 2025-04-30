/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Asset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Asset" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "Asset_userId_name_key" ON "Asset"("userId", "name");
