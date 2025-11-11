// src/registros/registros.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { PrismaService } from '../prisma/prisma.service'; // 1. IMPORTE O PRISMA

@Injectable()
export class RegistrosService {
  // 2. "Injete" o PrismaService (que é global, então funciona)
  constructor(private readonly prisma: PrismaService) {}

  // 3. Implemente o método create (Funcionalidade 2)
  create(createRegistroDto: CreateRegistroDto) {
    // 4. Use o Prisma para salvar o novo registro no banco
    return this.prisma.registroDescarte.create({
      data: createRegistroDto,
    });
  }

  //
  // Vamos implementar a Funcionalidade 3 (Consulta) aqui
  //
  findAll() {
    // Retorna todos os registros, incluindo a informação do Ponto
    return this.prisma.registroDescarte.findMany({
      include: {
        ponto: true, // Isso "junta" os dados do PontoDescarte
      },
    });
  }

  //
  // Não vamos mexer nos outros por enquanto
  //
  findOne(id: number) {
    return `This action returns a #${id} registro`;
  }

  update(id: number, updateRegistroDto: any) {
    return `This action updates a #${id} registro`;
  }

  remove(id: number) {
    return `This action removes a #${id} registro`;
  }
}