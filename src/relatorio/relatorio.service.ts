// src/relatorio/relatorio.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { subDays, subMonths } from 'date-fns'; // Precisamos de uma lib de data

@Injectable()
export class RelatorioService {
  constructor(private readonly prisma: PrismaService) {}

  async getRelatorio() {
    // --- Datas para os filtros ---
    const hoje = new Date();
    const data30DiasAtras = subDays(hoje, 30);
    const inicioMesPassado = subMonths(hoje, 1);

    // --- 1. Local com mais registros ---
    const localMaisRegistros = await this.prisma.registroDescarte.groupBy({
      by: ['pontoId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 1,
    });

    // --- 2. Resíduo mais frequente ---
    const residuoMaisFrequente = await this.prisma.registroDescarte.groupBy({
      by: ['tipoResiduo'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
      take: 1,
    });

    // --- 3. Média de descartes (últimos 30 dias) ---
    const totalDescartes30Dias = await this.prisma.registroDescarte.count({
      where: {
        data: {
          gte: data30DiasAtras, // gte = "maior ou igual a"
        },
      },
    });
    const mediaDescartes30Dias = totalDescartes30Dias / 30;

    // --- 4. Total de usuários (contagem distinta) ---
    const totalUsuarios = (
      await this.prisma.registroDescarte.findMany({
        distinct: ['nomeUsuario'],
      })
    ).length;

    // --- 5. Total de pontos de descarte ---
    const totalPontos = await this.prisma.pontoDescarte.count();

    // --- 6. Crescimento % (vs. mês passado) ---
    const totalDescartesMesPassado = await this.prisma.registroDescarte.count({
      where: {
        data: {
          gte: inicioMesPassado,
        },
      },
    });
    // (Este é um cálculo simplificado, o ideal seria comparar meses completos)
    // (Por enquanto, vamos usar a média para ter um número)
    const crescimento = (mediaDescartes30Dias - totalDescartesMesPassado / 30) / (totalDescartesMesPassado / 30) * 100;

    // --- Retorna o JSON final ---
    return {
      localDeDescarteComMaiorNumeroDeRegistros: localMaisRegistros[0] || null,
      tipoDeResiduoMaisFrequente: residuoMaisFrequente[0] || null,
      mediaDeDescartesPorDiaUltimos30Dias: mediaDescartes30Dias.toFixed(2),
      numeroTotalDeUsuariosNoSistema: totalUsuarios,
      totalDePontosDeDescarteCadastrados: totalPontos,
      percentualCrescimentoOuReducaoVolumeDescartes: crescimento.toFixed(2) + '%' || '0%',
    };
  }
}
