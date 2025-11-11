// src/registros/dto/create-registro.dto.ts

// Já instalamos 'class-validator', então podemos usá-lo
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRegistroDto {
  @IsString()
  @IsNotEmpty()
  nomeUsuario: string;

  @IsString()
  @IsNotEmpty()
  tipoResiduo: string; // "plástico", "papel", "orgânico", etc.

  @IsDateString() // Valida se é uma string de data (ex: "2025-10-10T00:00:00.000Z")
  data: Date;

  @IsInt() // Valida se é um número inteiro
  pontoId: number; // O ID do PontoDescarte
}
