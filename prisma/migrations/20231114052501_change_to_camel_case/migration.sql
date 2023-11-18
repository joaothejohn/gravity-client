/*
  Warnings:

  - The primary key for the `Domain` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DomainId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Domain` table. All the data in the column will be lost.
  - The primary key for the `DomainRouter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DomainId` on the `DomainRouter` table. All the data in the column will be lost.
  - You are about to drop the column `Ip` on the `DomainRouter` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `DomainRouter` table. All the data in the column will be lost.
  - You are about to drop the column `RouterId` on the `DomainRouter` table. All the data in the column will be lost.
  - The primary key for the `RadiusUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DomainId` on the `RadiusUser` table. All the data in the column will be lost.
  - You are about to drop the column `Ip` on the `RadiusUser` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `RadiusUser` table. All the data in the column will be lost.
  - You are about to drop the column `PlanId` on the `RadiusUser` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `RadiusUser` table. All the data in the column will be lost.
  - You are about to drop the column `UserName` on the `RadiusUser` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DomainId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserName` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BurstLimit` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `BurstThreshold` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `BurstTime` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `DomainId` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `LimitAt` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `MaxLimit` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `PlanId` on the `UserPlan` table. All the data in the column will be lost.
  - You are about to drop the column `Priority` on the `UserPlan` table. All the data in the column will be lost.
  - The required column `domainId` was added to the `Domain` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domainId` to the `DomainRouter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `DomainRouter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DomainRouter` table without a default value. This is not possible if the table is not empty.
  - The required column `routerId` was added to the `DomainRouter` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `domainId` to the `RadiusUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `RadiusUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `RadiusUser` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `RadiusUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userName` to the `RadiusUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domainId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `userId` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domainId` to the `UserPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limitAt` to the `UserPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxLimit` to the `UserPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserPlan` table without a default value. This is not possible if the table is not empty.
  - The required column `planId` was added to the `UserPlan` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `priority` to the `UserPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DomainRouter" DROP CONSTRAINT "DomainRouter_DomainId_fkey";

-- DropForeignKey
ALTER TABLE "RadiusUser" DROP CONSTRAINT "RadiusUser_DomainId_fkey";

-- DropForeignKey
ALTER TABLE "RadiusUser" DROP CONSTRAINT "RadiusUser_PlanId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_DomainId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlan" DROP CONSTRAINT "UserPlan_DomainId_fkey";

-- AlterTable
ALTER TABLE "Domain" DROP CONSTRAINT "Domain_pkey",
DROP COLUMN "DomainId",
DROP COLUMN "Name",
ADD COLUMN     "domainId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Domain_pkey" PRIMARY KEY ("domainId");

-- AlterTable
ALTER TABLE "DomainRouter" DROP CONSTRAINT "DomainRouter_pkey",
DROP COLUMN "DomainId",
DROP COLUMN "Ip",
DROP COLUMN "Name",
DROP COLUMN "RouterId",
ADD COLUMN     "domainId" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "routerId" TEXT NOT NULL,
ADD CONSTRAINT "DomainRouter_pkey" PRIMARY KEY ("routerId");

-- AlterTable
ALTER TABLE "RadiusUser" DROP CONSTRAINT "RadiusUser_pkey",
DROP COLUMN "DomainId",
DROP COLUMN "Ip",
DROP COLUMN "Password",
DROP COLUMN "PlanId",
DROP COLUMN "UserId",
DROP COLUMN "UserName",
ADD COLUMN     "domainId" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "planId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD CONSTRAINT "RadiusUser_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "DomainId",
DROP COLUMN "Password",
DROP COLUMN "UserId",
DROP COLUMN "UserName",
ADD COLUMN     "domainId" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userId");

-- AlterTable
ALTER TABLE "UserPlan" DROP CONSTRAINT "UserPlan_pkey",
DROP COLUMN "BurstLimit",
DROP COLUMN "BurstThreshold",
DROP COLUMN "BurstTime",
DROP COLUMN "DomainId",
DROP COLUMN "LimitAt",
DROP COLUMN "MaxLimit",
DROP COLUMN "Name",
DROP COLUMN "PlanId",
DROP COLUMN "Priority",
ADD COLUMN     "burstLimit" TEXT,
ADD COLUMN     "burstThreshold" TEXT,
ADD COLUMN     "burstTime" TEXT,
ADD COLUMN     "domainId" TEXT NOT NULL,
ADD COLUMN     "limitAt" TEXT NOT NULL,
ADD COLUMN     "maxLimit" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "planId" TEXT NOT NULL,
ADD COLUMN     "priority" TEXT NOT NULL,
ADD CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("planId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("domainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiusUser" ADD CONSTRAINT "RadiusUser_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("domainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiusUser" ADD CONSTRAINT "RadiusUser_planId_fkey" FOREIGN KEY ("planId") REFERENCES "UserPlan"("planId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("domainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainRouter" ADD CONSTRAINT "DomainRouter_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("domainId") ON DELETE RESTRICT ON UPDATE CASCADE;
