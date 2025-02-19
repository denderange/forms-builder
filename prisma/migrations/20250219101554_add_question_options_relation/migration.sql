/*
  Warnings:

  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - Added the required column `questionTitle` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "text",
ADD COLUMN     "questionTitle" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;
