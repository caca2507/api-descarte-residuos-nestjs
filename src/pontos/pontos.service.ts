// src/pontos/pontos.service.ts
import { Injectable } from '@nestjs/common';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { PrismaService } from '../prisma/prisma.service'; // 1. IMPORTE O PRISMA

@Injectable()
export class PontosService {
  
  // 2. "Injete" o PrismaService no construtor
  constructor(private readonly prisma: PrismaService) {}

  // 3. Implemente o método create para salvar no banco
  create(createPontoDto: CreatePontoDto) {
    // 4. Use o Prisma para salvar os dados do DTO no banco
    return this.prisma.pontoDescarte.create({
      data: createPontoDto,
    });
  }

  // Bônus: Vamos implementar o "buscar todos" que o Nest criou
  findAll() {
    return this.prisma.pontoDescarte.findMany(); // Isso busca todos os pontos no banco
  }

  //
  // Não vamos mexer nos outros por enquanto, deixe como estão
  //
  findOne(id: number) {
    return `This action returns a #${id} ponto`;
  }

  update(id: number, updatePontoDto: any) {
    return `This action updates a #${id} ponto`;
  }

  remove(id: number) {
    return `This action removes a #${id} ponto`;
  }
}