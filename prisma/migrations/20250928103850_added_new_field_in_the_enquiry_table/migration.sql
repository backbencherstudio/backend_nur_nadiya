/*
  Warnings:

  - You are about to drop the column `image` on the `enquiries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."enquiries" DROP COLUMN "image",
ADD COLUMN     "image_name" TEXT,
ADD COLUMN     "image_path" TEXT;
