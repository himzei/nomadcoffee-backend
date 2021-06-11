/*
  Warnings:

  - Made the column `latitude` on table `CoffeeShop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `CoffeeShop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url` on table `CoffeeShopPhoto` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ALTER COLUMN "url" SET NOT NULL;
