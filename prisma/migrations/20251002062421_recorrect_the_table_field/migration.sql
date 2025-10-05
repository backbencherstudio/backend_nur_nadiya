/*
  Warnings:

  - You are about to drop the column `area_of_work_five` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `area_of_work_four` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `area_of_work_one` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `area_of_work_seven` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `area_of_work_six` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `area_of_work_three` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `area_of_work_two` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `assessment_or_observation_five` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `assessment_or_observation_four` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `assessment_or_observation_seven` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `assessment_or_observation_six` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `assessment_or_observation_three` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `assessment_or_observation_two` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `experience_five` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `experience_four` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `experience_one` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `experience_seven` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `experience_six` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `experience_three` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `experience_two` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `willingness_five` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `willingness_four` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `willingness_one` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `willingness_seven` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `willingness_six` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `willingness_three` on the `bio_data` table. All the data in the column will be lost.
  - You are about to drop the column `willingness_two` on the `bio_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."bio_data" DROP COLUMN "area_of_work_five",
DROP COLUMN "area_of_work_four",
DROP COLUMN "area_of_work_one",
DROP COLUMN "area_of_work_seven",
DROP COLUMN "area_of_work_six",
DROP COLUMN "area_of_work_three",
DROP COLUMN "area_of_work_two",
DROP COLUMN "assessment_or_observation_five",
DROP COLUMN "assessment_or_observation_four",
DROP COLUMN "assessment_or_observation_seven",
DROP COLUMN "assessment_or_observation_six",
DROP COLUMN "assessment_or_observation_three",
DROP COLUMN "assessment_or_observation_two",
DROP COLUMN "experience_five",
DROP COLUMN "experience_four",
DROP COLUMN "experience_one",
DROP COLUMN "experience_seven",
DROP COLUMN "experience_six",
DROP COLUMN "experience_three",
DROP COLUMN "experience_two",
DROP COLUMN "languages",
DROP COLUMN "willingness_five",
DROP COLUMN "willingness_four",
DROP COLUMN "willingness_one",
DROP COLUMN "willingness_seven",
DROP COLUMN "willingness_six",
DROP COLUMN "willingness_three",
DROP COLUMN "willingness_two",
ADD COLUMN     "care_of_disabled" TEXT,
ADD COLUMN     "care_of_disabled_assessment" TEXT,
ADD COLUMN     "care_of_disabled_experience" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "care_of_disabled_willingness" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "care_of_elderly" TEXT,
ADD COLUMN     "care_of_elderly_assessment" TEXT,
ADD COLUMN     "care_of_elderly_experience" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "care_of_elderly_willingness" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "care_of_infants" TEXT,
ADD COLUMN     "care_of_infants_experience" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "care_of_infants_willingness" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cooking" TEXT,
ADD COLUMN     "cooking_assessment" TEXT,
ADD COLUMN     "cooking_experience" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cooking_willingness" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "general_housework" TEXT,
ADD COLUMN     "general_housework_assessment" TEXT,
ADD COLUMN     "general_housework_experience" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "general_housework_willingnes" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language_abilities" TEXT,
ADD COLUMN     "language_abilities_assessment" TEXT,
ADD COLUMN     "language_abilities_experience" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "language_abilities_willingness" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "other_skills" TEXT,
ADD COLUMN     "other_skills_assessment" TEXT,
ADD COLUMN     "other_skills_experience" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "other_skills_willingness" BOOLEAN NOT NULL DEFAULT false;
