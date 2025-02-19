/*
  Warnings:

  - Changed the type of `answer` on the `Response` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_questionId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "isRequired" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "answer",
ADD COLUMN     "answer" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Template" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Comment_userId_templateId_idx" ON "Comment"("userId", "templateId");
