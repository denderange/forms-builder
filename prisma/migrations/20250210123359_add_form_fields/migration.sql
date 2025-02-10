/*
  Warnings:

  - Added the required column `questions` to the `Form` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "description" TEXT,
ADD COLUMN     "questions" JSONB NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
