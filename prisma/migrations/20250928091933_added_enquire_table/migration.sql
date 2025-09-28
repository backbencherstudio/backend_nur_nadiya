-- CreateTable
CREATE TABLE "public"."enquiries" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "transfer_date" TIMESTAMP(3) NOT NULL,
    "wp_number" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "additional_information" TEXT NOT NULL,
    "current_employer" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enquiries_pkey" PRIMARY KEY ("id")
);
