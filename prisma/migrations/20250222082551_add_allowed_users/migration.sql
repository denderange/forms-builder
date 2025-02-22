-- AlterTable
ALTER TABLE "FormTemplate" ADD COLUMN     "accessType" "AccessType" DEFAULT 'PUBLIC',
ADD COLUMN     "allowedUsers" TEXT[];
