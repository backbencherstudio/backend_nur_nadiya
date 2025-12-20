-- AlterTable
ALTER TABLE "public"."bio_data" ADD COLUMN     "asthma" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "diabetes" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hypertension" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."employer_enquiries" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'uncontacted';

-- AlterTable
ALTER TABLE "public"."maid_enquiries" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'uncontacted';
