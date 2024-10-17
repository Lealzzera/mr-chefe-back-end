/*
  Warnings:

  - You are about to drop the column `userId` on the `stores` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_userId_fkey";

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "userId",
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "UserStore" (
    "userId" TEXT NOT NULL,
    "storeId" INTEGER NOT NULL,
    "role" "Role",

    CONSTRAINT "UserStore_pkey" PRIMARY KEY ("userId","storeId")
);

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStore" ADD CONSTRAINT "UserStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserStore" ADD CONSTRAINT "UserStore_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
