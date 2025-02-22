/*
  Warnings:

  - You are about to drop the column `authorId` on the `FormTemplate` table. All the data in the column will be lost.
  - Added the required column `authorClerkId` to the `FormTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FormTemplate" DROP CONSTRAINT "FormTemplate_authorId_fkey";

-- AlterTable
ALTER TABLE "FormTemplate" DROP COLUMN "authorId",
ADD COLUMN     "authorClerkId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "FormTemplate" ADD CONSTRAINT "FormTemplate_authorClerkId_fkey" FOREIGN KEY ("authorClerkId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
