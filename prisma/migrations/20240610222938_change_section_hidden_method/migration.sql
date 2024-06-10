/*
  Warnings:

  - You are about to drop the column `colorSection` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `themeSection` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "colorSection",
DROP COLUMN "themeSection",
ADD COLUMN     "hiddenSections" TEXT[];
