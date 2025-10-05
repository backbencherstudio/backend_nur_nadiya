/*
  Warnings:

  - You are about to drop the column `current_employer` on the `employer_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `date_of_birth` on the `employer_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `image_name` on the `employer_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `mobile_number` on the `employer_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `employer_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `transfer_date` on the `employer_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `wp_number` on the `employer_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `maid_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `contact_number` on the `maid_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `maid_enquiries` table. All the data in the column will be lost.
  - You are about to drop the column `hosehold_type` on the `maid_enquiries` table. All the data in the column will be lost.
  - Added the required column `budget` to the `employer_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact_number` to the `employer_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `employer_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hosehold_type` to the `employer_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `current_employer` to the `maid_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `maid_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile_number` to the `maid_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `maid_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transfer_date` to the `maid_enquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wp_number` to the `maid_enquiries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."employer_enquiries" DROP COLUMN "current_employer",
DROP COLUMN "date_of_birth",
DROP COLUMN "image_name",
DROP COLUMN "mobile_number",
DROP COLUMN "nationality",
DROP COLUMN "transfer_date",
DROP COLUMN "wp_number",
ADD COLUMN     "budget" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "contact_number" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "email" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "hosehold_type" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."maid_enquiries" DROP COLUMN "budget",
DROP COLUMN "contact_number",
DROP COLUMN "email",
DROP COLUMN "hosehold_type",
ADD COLUMN     "current_employer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mobile_number" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "nationality" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "transfer_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "wp_number" TEXT NOT NULL DEFAULT '';
