// src/relatorio/relatorio.controller.ts
import { Controller, Get } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller() // <-- Deixe o @Controller() vazio
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Get('relatorio') // <-- Define a rota GET /relatorio
  getRelatorio() {
    // Chama o serviço para fazer os cálculos
    return this.relatorioService.getRelatorio();
  }
}
