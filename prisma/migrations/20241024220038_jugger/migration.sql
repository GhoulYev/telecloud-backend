/*
  Warnings:

  - You are about to alter the column `owner_id` on the `File` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `BigInt`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "owner_id" BIGINT NOT NULL,
    CONSTRAINT "File_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_File" ("file_name", "file_path", "id", "owner_id") SELECT "file_name", "file_path", "id", "owner_id" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
CREATE UNIQUE INDEX "File_file_path_key" ON "File"("file_path");
CREATE TABLE "new_User" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL
);
INSERT INTO "new_User" ("id", "path") SELECT "id", "path" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_path_key" ON "User"("path");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
