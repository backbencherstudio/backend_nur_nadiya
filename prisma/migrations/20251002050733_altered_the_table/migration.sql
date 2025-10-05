-- AlterTable
ALTER TABLE "public"."employer_enquiries" ALTER COLUMN "budget" DROP DEFAULT,
ALTER COLUMN "contact_number" DROP DEFAULT,
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "hosehold_type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."maid_enquiries" ALTER COLUMN "current_employer" DROP DEFAULT,
ALTER COLUMN "date_of_birth" DROP DEFAULT,
ALTER COLUMN "mobile_number" DROP DEFAULT,
ALTER COLUMN "nationality" DROP DEFAULT,
ALTER COLUMN "transfer_date" DROP DEFAULT,
ALTER COLUMN "wp_number" DROP DEFAULT;
