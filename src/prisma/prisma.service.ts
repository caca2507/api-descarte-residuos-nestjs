import { Injectable, OnModuleInit } from '@nestjs/common';
// 1. TEM QUE IMPORTAR O 'PrismaClient' DAQUI:
import { PrismaClient } from '@prisma/client'; 

@Injectable()
// 2. TEM QUE TER O 'extends PrismaClient' AQUI:
export class PrismaService extends PrismaClient implements OnModuleInit {
  
  async onModuleInit() {
    await this.$connect();
  }
}