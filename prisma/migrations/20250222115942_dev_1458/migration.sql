/*
  Warnings:

  - Made the column `formTemplateId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `questionId` on table `QuestionOption` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "formTemplateId" SET NOT NULL;

-- AlterTable
ALTER TABLE "QuestionOption" ALTER COLUMN "questionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "FormTemplate" ADD CONSTRAINT "FormTemplate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formTemplateId_fkey" FOREIGN KEY ("formTemplateId") REFERENCES "FormTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
