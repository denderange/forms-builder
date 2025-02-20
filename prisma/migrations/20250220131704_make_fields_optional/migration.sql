-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_userId_fkey";

-- DropForeignKey
ALTER TABLE "FormTemplate" DROP CONSTRAINT "FormTemplate_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_userId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_formTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_formId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "text" SET DEFAULT '',
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "templateId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "templateId" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "questions" DROP NOT NULL,
ALTER COLUMN "questions" SET DEFAULT '{}',
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "title" SET DEFAULT '';

-- AlterTable
ALTER TABLE "FormTemplate" ALTER COLUMN "formTitle" DROP NOT NULL,
ALTER COLUMN "formTitle" SET DEFAULT '',
ALTER COLUMN "accessType" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "authorId" DROP NOT NULL,
ALTER COLUMN "theme" SET DEFAULT '',
ALTER COLUMN "isPublic" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "templateId" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "position" DROP NOT NULL,
ALTER COLUMN "position" SET DEFAULT 0,
ALTER COLUMN "questionTitle" DROP NOT NULL,
ALTER COLUMN "questionTitle" SET DEFAULT '',
ALTER COLUMN "imageUrl" SET DEFAULT '',
ALTER COLUMN "isRequired" DROP NOT NULL,
ALTER COLUMN "formTemplateId" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "type" SET DEFAULT '';

-- AlterTable
ALTER TABLE "QuestionOption" ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "text" SET DEFAULT '',
ALTER COLUMN "questionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "formId" DROP NOT NULL,
ALTER COLUMN "questionId" DROP NOT NULL,
ALTER COLUMN "answer" DROP NOT NULL,
ALTER COLUMN "answer" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "clerkId" DROP NOT NULL,
ALTER COLUMN "role" DROP NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "email" SET DEFAULT '',
ALTER COLUMN "name" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "FormTemplate" ADD CONSTRAINT "FormTemplate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formTemplateId_fkey" FOREIGN KEY ("formTemplateId") REFERENCES "FormTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "FormTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "FormTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "FormTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
