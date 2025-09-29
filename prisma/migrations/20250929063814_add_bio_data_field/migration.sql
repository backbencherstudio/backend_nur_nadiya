-- AlterTable
ALTER TABLE "public"."bio_data" ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'available';
