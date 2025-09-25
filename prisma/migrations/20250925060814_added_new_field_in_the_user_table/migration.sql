-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "googleId" TEXT,
ADD COLUMN     "isGoogleVerified" BOOLEAN NOT NULL DEFAULT false;
