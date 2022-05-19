-- CreateTable
CREATE TABLE "auctions" (
    "id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "item_image" TEXT,

    CONSTRAINT "auctions_pkey" PRIMARY KEY ("id")
);
