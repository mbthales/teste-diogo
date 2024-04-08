/*
  Warnings:

  - Added the required column `fabricante` to the `Smartphone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Smartphone" ADD COLUMN     "fabricante" TEXT NOT NULL;
