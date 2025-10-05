/*
  Warnings:

  - You are about to drop the column `assessment_or_observation_one` on the `bio_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."bio_data" DROP COLUMN "assessment_or_observation_one",
ADD COLUMN     "care_of_infants_assessment" TEXT;
