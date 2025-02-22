-- CreateTable
CREATE TABLE "_FormTemplateTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FormTemplateTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FormTemplateTags_B_index" ON "_FormTemplateTags"("B");

-- AddForeignKey
ALTER TABLE "_FormTemplateTags" ADD CONSTRAINT "_FormTemplateTags_A_fkey" FOREIGN KEY ("A") REFERENCES "FormTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FormTemplateTags" ADD CONSTRAINT "_FormTemplateTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
