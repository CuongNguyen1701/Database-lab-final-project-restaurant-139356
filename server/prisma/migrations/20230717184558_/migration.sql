/*
  Warnings:

  - You are about to drop the column `staffID` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_staffID_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "staffID";

-- DropTable
DROP TABLE "Staff";
