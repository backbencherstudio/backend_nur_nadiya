-- AlterTable
ALTER TABLE "public"."bio_data" ADD COLUMN     "country" TEXT,
ADD COLUMN     "date_from" TIMESTAMP(3),
ADD COLUMN     "date_to" TIMESTAMP(3),
ADD COLUMN     "employer" TEXT,
ADD COLUMN     "other_remarks" TEXT,
ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "work_duties" TEXT;
