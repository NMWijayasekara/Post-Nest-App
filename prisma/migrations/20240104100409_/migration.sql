-- AlterSequence
ALTER SEQUENCE "Post_id_seq" MAXVALUE 9223372036854775807;

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role";
