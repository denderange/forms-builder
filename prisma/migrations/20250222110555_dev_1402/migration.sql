/*
  Warnings:

  - The `accessType` column on the `FormTemplate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FormTemplate" DROP COLUMN "accessType",
ADD COLUMN     "accessType" TEXT NOT NULL DEFAULT 'PUBLIC';
