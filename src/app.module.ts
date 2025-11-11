// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PontosModule } from './pontos/pontos.module';
import { PrismaModule } from './prisma/prisma.module';
import { RegistrosModule } from './registros/registros.module'; // 1. IMPORTE O 'RegistrosModule'
import { RelatorioModule } from './relatorio/relatorio.module'; // 2. IMPORTE O 'RelatorioModule'

@Module({
  imports: [
    PontosModule,
    PrismaModule,
    RegistrosModule, // 3. ADICIONE O 'RegistrosModule'
    RelatorioModule, // 4. ADICIONE O 'RelatorioModule'
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}