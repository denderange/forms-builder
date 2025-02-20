/*
  Warnings:

  - You are about to drop the column `templateId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `formTemplateId` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_authorId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateTag" DROP CONSTRAINT "TemplateTag_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateTag" DROP CONSTRAINT "TemplateTag_templateId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "templateId",
ADD COLUMN     "formTemplateId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "position" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "formTemplateId" TEXT;

-- DropTable
DROP TABLE "Template";

-- DropTable
DROP TABLE "TemplateTag";

-- DropEnum
DROP TYPE "QuestionType";

-- CreateTable
CREATE TABLE "FormTemplate" (
    "id" TEXT NOT NULL,
    "formTitle" TEXT NOT NULL,
    "formDescription" TEXT DEFAULT '',
    "accessType" "AccessType" NOT NULL DEFAULT 'PUBLIC',
    "allowedUsers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "theme" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "FormTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_formTemplateId_fkey" FOREIGN KEY ("formTemplateId") REFERENCES "FormTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormTemplate" ADD CONSTRAINT "FormTemplate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formTemplateId_fkey" FOREIGN KEY ("formTemplateId") REFERENCES "FormTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "FormTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "FormTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "FormTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
