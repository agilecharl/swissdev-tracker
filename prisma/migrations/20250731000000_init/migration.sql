-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "swissdev";

-- CreateEnum
CREATE TYPE "swissdev"."JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP');

-- CreateEnum
CREATE TYPE "swissdev"."JobStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'FILLED');

-- CreateTable
CREATE TABLE "swissdev"."companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "industry" TEXT NOT NULL,
    "size" TEXT,
    "location" TEXT NOT NULL,
    "website" TEXT,
    "founded" INTEGER,
    "logo" TEXT,
    "benefits" TEXT[],
    "openPositions" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swissdev"."jobs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyId" INTEGER,
    "location" TEXT NOT NULL,
    "type" "swissdev"."JobType" NOT NULL,
    "salary" TEXT,
    "description" TEXT,
    "requirements" TEXT[],
    "postedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "swissdev"."JobStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_name_key" ON "swissdev"."companies"("name");

-- AddForeignKey
ALTER TABLE "swissdev"."jobs" ADD CONSTRAINT "jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "swissdev"."companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
