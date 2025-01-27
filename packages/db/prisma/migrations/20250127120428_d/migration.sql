/*
  Warnings:

  - You are about to drop the column `AvailableriggerId` on the `Trigger` table. All the data in the column will be lost.
  - Added the required column `availableTriggersId` to the `Trigger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Trigger" DROP CONSTRAINT "Trigger_AvailableriggerId_fkey";

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "AvailableriggerId",
ADD COLUMN     "availableTriggersId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Trigger" ADD CONSTRAINT "Trigger_availableTriggersId_fkey" FOREIGN KEY ("availableTriggersId") REFERENCES "AvailableTriggers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
