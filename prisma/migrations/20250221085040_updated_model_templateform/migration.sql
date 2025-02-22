/*
  Warnings:

  - Made the column `formTitle` on table `FormTemplate` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `FormTemplate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "FormTemplate" DROP CONSTRAINT "FormTemplate_authorId_fkey";

-- AlterTable
ALTER TABLE "FormTemplate" ALTER COLUMN "formTitle" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL,
ALTER COLUMN "allowedUsers" SET DEFAULT '[]';

-- AddForeignKey
ALTER TABLE "FormTemplate" ADD CONSTRAINT "FormTemplate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
