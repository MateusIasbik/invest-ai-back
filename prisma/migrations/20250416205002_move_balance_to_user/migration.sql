/*
  Warnings:

  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "money" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Wallet";
