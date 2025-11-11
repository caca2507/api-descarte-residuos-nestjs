-- CreateTable
CREATE TABLE "PontoDescarte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeLocal" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "tipoLocal" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "RegistroDescarte" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeUsuario" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "tipoResiduo" TEXT NOT NULL,
    "pontoId" INTEGER NOT NULL,
    CONSTRAINT "RegistroDescarte_pontoId_fkey" FOREIGN KEY ("pontoId") REFERENCES "PontoDescarte" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
