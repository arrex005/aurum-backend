-- CreateTable
CREATE TABLE "Producto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "metal" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "peso" TEXT NOT NULL,
    "pureza" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "imagen" TEXT,
    "destacado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrecioMetal" (
    "id" SERIAL NOT NULL,
    "metal" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "unidad" TEXT NOT NULL DEFAULT 'oz',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrecioMetal_pkey" PRIMARY KEY ("id")
);
