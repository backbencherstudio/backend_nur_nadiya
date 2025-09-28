-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "last_login_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "refreshToken" TEXT;
