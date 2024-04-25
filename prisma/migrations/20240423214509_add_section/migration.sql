/*
  Warnings:

  - Added the required column `colorSection` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeSection` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "colorSection" BOOLEAN NOT NULL,
ADD COLUMN     "themeSection" BOOLEAN NOT NULL;
