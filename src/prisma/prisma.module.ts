// src/prisma/prisma.module.ts

import { Global, Module } from '@nestjs/common'; // 1. VERIFIQUE SE 'Global' FOI IMPORTADO
import { PrismaService } from './prisma.service';

@Global() // <-- 2. VERIFIQUE SE VOCÊ TEM O DECORATOR '@Global()' AQUI
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <-- 3. VERIFIQUE SE VOCÊ TEM 'exports: [PrismaService]' AQUI
})
export class PrismaModule {}