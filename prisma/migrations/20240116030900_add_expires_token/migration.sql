/*
  Warnings:

  - Added the required column `expires` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Token` ADD COLUMN `expires` DATETIME(3) NOT NULL;
