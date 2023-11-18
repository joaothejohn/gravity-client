-- CreateTable
CREATE TABLE "User" (
    "UserId" TEXT NOT NULL,
    "DomainId" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "RadiusUser" (
    "UserId" TEXT NOT NULL,
    "DomainId" TEXT NOT NULL,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Ip" TEXT NOT NULL,
    "PlanId" TEXT,

    CONSTRAINT "RadiusUser_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "UserPlan" (
    "PlanId" TEXT NOT NULL,
    "DomainId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "MaxLimit" TEXT NOT NULL,
    "LimitAt" TEXT NOT NULL,
    "Priority" TEXT NOT NULL,
    "BurstLimit" TEXT,
    "BurstThreshold" TEXT,
    "BurstTime" TEXT,

    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("PlanId")
);

-- CreateTable
CREATE TABLE "Domain" (
    "DomainId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("DomainId")
);

-- CreateTable
CREATE TABLE "DomainRouter" (
    "RouterId" TEXT NOT NULL,
    "DomainId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Ip" TEXT NOT NULL,

    CONSTRAINT "DomainRouter_pkey" PRIMARY KEY ("RouterId")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_DomainId_fkey" FOREIGN KEY ("DomainId") REFERENCES "Domain"("DomainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiusUser" ADD CONSTRAINT "RadiusUser_DomainId_fkey" FOREIGN KEY ("DomainId") REFERENCES "Domain"("DomainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RadiusUser" ADD CONSTRAINT "RadiusUser_PlanId_fkey" FOREIGN KEY ("PlanId") REFERENCES "UserPlan"("PlanId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_DomainId_fkey" FOREIGN KEY ("DomainId") REFERENCES "Domain"("DomainId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DomainRouter" ADD CONSTRAINT "DomainRouter_DomainId_fkey" FOREIGN KEY ("DomainId") REFERENCES "Domain"("DomainId") ON DELETE RESTRICT ON UPDATE CASCADE;
