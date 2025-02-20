/*
  Warnings:

  - The `allowedUsers` column on the `FormTemplate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "questions" DROP DEFAULT;

-- AlterTable
ALTER TABLE "FormTemplate" DROP COLUMN "allowedUsers",
ADD COLUMN     "allowedUsers" JSONB;

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "answer" DROP DEFAULT;
