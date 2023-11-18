/*
  Warnings:

  - The primary key for the `Domain` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `domainId` on the `Domain` table. All the data in the column will be lost.
  - The primary key for the `RadiusUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `RadiusUser` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserPlan` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `Domain` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `RadiusUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "DomainRouter" DROP CONSTRAINT "DomainRouter_domainId_fkey";

-- DropForeignKey
ALTER TABLE "RadiusUser" DROP CONSTRAINT "RadiusUser_domainId_fkey";

-- DropForeignKey
ALTER TABLE "RadiusUser" DROP CONSTRAINT "RadiusUser_planId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_domainId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlan" DROP CONSTRAINT "UserPlan_domainId_fkey";

-- AlterTable
ALTER TABLE "Domain" DROP CONSTRAINT "Domain_pkey",
DROP COLUMN "domainId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Domain_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RadiusUser" DROP CONSTRAINT "RadiusUser_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "RadiusUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "UserPlan";

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxLimit" TEXT NOT NULL,
    "limitAt" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "burstLimit" TEXT,
    "burstThreshold" TEXT,
    "burstTime" TEXT,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiusUser" ADD CONSTRAINT "RadiusUser_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiusUser" ADD CONSTRAINT "RadiusUser_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainRouter" ADD CONSTRAINT "DomainRouter_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
