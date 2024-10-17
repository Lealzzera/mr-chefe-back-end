-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" DEFAULT 'USER';
