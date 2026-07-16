-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "apellidos" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "ciudad" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "codigoExpira" TIMESTAMP(3),
ADD COLUMN     "codigoPostal" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "codigoVerificacion" TEXT,
ADD COLUMN     "direccion" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "emailVerificado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "provincia" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "telefono" TEXT NOT NULL DEFAULT '';
