/*
  Warnings:

  - Changed the type of `ascCode` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Ascs" AS ENUM ('AJU3198122', 'SLZ5286953');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'OQC';

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "ascCode",
ADD COLUMN     "ascCode" "Ascs" NOT NULL;
