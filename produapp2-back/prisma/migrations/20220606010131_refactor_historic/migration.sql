/*
  Warnings:

  - Added the required column `userIdUpdated` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "userIdUpdated" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "historic" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL,

    CONSTRAINT "historic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "historic" ADD CONSTRAINT "historic_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historic" ADD CONSTRAINT "historic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_userIdUpdated_fkey" FOREIGN KEY ("userIdUpdated") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
