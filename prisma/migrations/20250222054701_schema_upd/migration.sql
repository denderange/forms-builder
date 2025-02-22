/*
  Warnings:

  - You are about to drop the column `accessType` on the `FormTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `allowedUsers` on the `FormTemplate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_templateId_fkey";

-- DropForeignKey
ALTER TABLE "FormTemplate" DROP CONSTRAINT "FormTemplate_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_templateId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_formTemplateId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_formTemplateId_fkey";

-- AlterTable
ALTER TABLE "FormTemplate" DROP COLUMN "accessType",
DROP COLUMN "allowedUsers";
