/*
  Warnings:

  - You are about to drop the column `datetime` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the `type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `elapsedTime` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateTime` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Avaliation', 'PendingSaw', 'PendingCost', 'PendingParts', 'PendingOthers', 'InRepair', 'Finished', 'OQCFail', 'Canceled');

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_typeId_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';

-- AlterTable
ALTER TABLE "item" DROP COLUMN "datetime",
DROP COLUMN "typeId",
ADD COLUMN     "createTime" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "elapsedTime" INTEGER NOT NULL,
ADD COLUMN     "ffOqc" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'Avaliation',
ADD COLUMN     "updateTime" TIMESTAMP(6) NOT NULL;

-- DropTable
DROP TABLE "type";
