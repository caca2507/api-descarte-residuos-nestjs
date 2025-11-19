// src/app.module.ts
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';  <-- APAGUE OU COMENTE ISSO
// import { AppService } from './app.service';        <-- APAGUE OU COMENTE ISSO
import { PontosModule } from './pontos/pontos.module';
import { PrismaModule } from './prisma/prisma.module';
import { RegistrosModule } from './registros/registros.module';
import { RelatorioModule } from './relatorio/relatorio.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    PontosModule,
    PrismaModule,
    RegistrosModule,
    RelatorioModule,
  ],
  controllers: [], // <-- DEIXE ESTA LISTA VAZIA (remova AppController)
  providers: [],   // <-- DEIXE ESTA LISTA VAZIA (remova AppService)
})
export class AppModule {}