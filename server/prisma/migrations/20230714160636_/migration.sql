/*
  Warnings:

  - You are about to drop the column `photo` on the `Item` table. All the data in the column will be lost.
  - Added the required column `imageURL` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "photo",
ADD COLUMN     "imageURL" TEXT NOT NULL;
