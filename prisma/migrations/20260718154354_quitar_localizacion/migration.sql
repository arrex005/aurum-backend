/*
  Warnings:

  - You are about to drop the column `ciudad` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `codigoPostal` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `direccion` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `provincia` on the `Cliente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "ciudad",
DROP COLUMN "codigoPostal",
DROP COLUMN "direccion",
DROP COLUMN "provincia";
