/*
  Warnings:

  - A unique constraint covering the columns `[os]` on the table `item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "item_os_key" ON "item"("os");
