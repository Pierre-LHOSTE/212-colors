/*
  Warnings:

  - You are about to drop the column `columnId` on the `theme_colors` table. All the data in the column will be lost.
  - Added the required column `position` to the `colors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `themeColumnId` to the `theme_colors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `theme_columns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `themes` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "theme_colors" DROP CONSTRAINT "theme_colors_columnId_fkey";

-- AlterTable
ALTER TABLE "colors" ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "theme_colors" DROP COLUMN "columnId",
ADD COLUMN     "themeColumnId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "theme_columns" ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "themes" ADD COLUMN     "position" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "dynamicTheme" BOOLEAN NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "settings_userId_key" ON "settings"("userId");

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme_colors" ADD CONSTRAINT "theme_colors_themeColumnId_fkey" FOREIGN KEY ("themeColumnId") REFERENCES "theme_columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
