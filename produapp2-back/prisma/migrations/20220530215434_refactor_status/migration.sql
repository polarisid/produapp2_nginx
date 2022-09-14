/*
  Warnings:

  - The values [Canceled] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Avaliation', 'PendingSaw', 'PendingCost', 'PendingParts', 'PendingOthers', 'InRepair', 'Finished', 'OQCFail');
ALTER TABLE "item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "item" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "item" ALTER COLUMN "status" SET DEFAULT 'Avaliation';
COMMIT;
