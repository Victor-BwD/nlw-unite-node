/*
  Warnings:

  - A unique constraint covering the columns `[name,email]` on the table `attendees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "attendees_name_email_key" ON "attendees"("name", "email");
