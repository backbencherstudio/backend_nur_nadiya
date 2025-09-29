/*
  Warnings:

  - You are about to drop the column `image_path` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `image_path` on the `employer_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `image_path` on the `maid_enquiries` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."bio_data" DROP COLUMN "image_path";

-- AlterTable
ALTER TABLE "public"."employer_enquiries" DROP COLUMN "image_path";

-- AlterTable
ALTER TABLE "public"."maid_enquiries" DROP COLUMN "image_path";
