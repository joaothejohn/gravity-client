-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_domainId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "domainId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
