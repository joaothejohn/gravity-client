/*
  Warnings:

  - You are about to drop the column `domain` on the `Team` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Team_domain_key";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "domain",
ADD COLUMN     "domainId" TEXT;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
