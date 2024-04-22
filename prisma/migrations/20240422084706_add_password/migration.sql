-- DropForeignKey
ALTER TABLE "theme_colors" DROP CONSTRAINT "theme_colors_columnId_fkey";

-- DropForeignKey
ALTER TABLE "theme_colors" DROP CONSTRAINT "theme_colors_themeId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "password" TEXT;

-- AddForeignKey
ALTER TABLE "theme_colors" ADD CONSTRAINT "theme_colors_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "theme_columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme_colors" ADD CONSTRAINT "theme_colors_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "themes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
