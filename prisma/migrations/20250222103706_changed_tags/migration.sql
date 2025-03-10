/*
  Warnings:

  - You are about to drop the column `isPublic` on the `FormTemplate` table. All the data in the column will be lost.
  - You are about to drop the `_FormTemplateTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FormTemplateTags" DROP CONSTRAINT "_FormTemplateTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_FormTemplateTags" DROP CONSTRAINT "_FormTemplateTags_B_fkey";

-- AlterTable
ALTER TABLE "FormTemplate" DROP COLUMN "isPublic",
ADD COLUMN     "templateTags" TEXT[];

-- DropTable
DROP TABLE "_FormTemplateTags";
