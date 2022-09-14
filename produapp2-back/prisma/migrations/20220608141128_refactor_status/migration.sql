/*
  Warnings:

  - The values [PendingSaw,PendingCost,PendingParts,PendingOthers,InRepair] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Avaliation', 'Pending', 'TechnicalAdvice', 'Finished', 'OQCFail', 'ConfirmedCost', 'ConfirmedParts', 'ConfirmedSaw', 'OQCPass');
ALTER TABLE "item" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "historic" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TABLE "item" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "item" ALTER COLUMN "status" SET DEFAULT 'Avaliation';
COMMIT;
