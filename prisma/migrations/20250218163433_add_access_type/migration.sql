-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('PUBLIC', 'RESTRICTED');

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "accessType" "AccessType" NOT NULL DEFAULT 'PUBLIC',
ADD COLUMN     "allowedUsers" TEXT[] DEFAULT ARRAY[]::TEXT[];
