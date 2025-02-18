/*
  Warnings:

  - You are about to drop the `_TemplateTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TemplateTags" DROP CONSTRAINT "_TemplateTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_TemplateTags" DROP CONSTRAINT "_TemplateTags_B_fkey";

-- DropTable
DROP TABLE "_TemplateTags";

-- CreateTable
CREATE TABLE "TemplateTag" (
    "templateId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TemplateTag_pkey" PRIMARY KEY ("templateId","tagId")
);

-- AddForeignKey
ALTER TABLE "TemplateTag" ADD CONSTRAINT "TemplateTag_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTag" ADD CONSTRAINT "TemplateTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
