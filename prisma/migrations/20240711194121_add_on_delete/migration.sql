-- DropForeignKey
ALTER TABLE "colors" DROP CONSTRAINT "colors_projectId_fkey";

-- DropForeignKey
ALTER TABLE "theme_colors" DROP CONSTRAINT "theme_colors_projectId_fkey";

-- DropForeignKey
ALTER TABLE "theme_columns" DROP CONSTRAINT "theme_columns_projectId_fkey";

-- DropForeignKey
ALTER TABLE "themes" DROP CONSTRAINT "themes_projectId_fkey";

-- AddForeignKey
ALTER TABLE "colors" ADD CONSTRAINT "colors_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme_colors" ADD CONSTRAINT "theme_colors_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme_columns" ADD CONSTRAINT "theme_columns_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "themes" ADD CONSTRAINT "themes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
