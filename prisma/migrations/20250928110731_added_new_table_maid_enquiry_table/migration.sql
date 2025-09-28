/*
  Warnings:

  - You are about to drop the `enquiries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."enquiries";

-- CreateTable
CREATE TABLE "public"."employer_enquiries" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "enquiry_type" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "transfer_date" TIMESTAMP(3) NOT NULL,
    "wp_number" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "additional_information" TEXT NOT NULL,
    "current_employer" BOOLEAN NOT NULL,
    "image_name" TEXT,
    "image_path" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employer_enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."maid_enquiries" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "enquiry_type" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hosehold_type" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "additional_information" TEXT NOT NULL,
    "image_name" TEXT,
    "image_path" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maid_enquiries_pkey" PRIMARY KEY ("id")
);
