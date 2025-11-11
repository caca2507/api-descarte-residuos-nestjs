// src/pontos/dto/create-ponto.dto.ts

// Vamos adicionar validações para garantir que os dados cheguem corretos.
// Primeiro, rode no terminal: npm install class-validator class-transformer
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePontoDto {
  @IsString()
  @IsNotEmpty()
  nomeLocal: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  tipoLocal: string; // "publico" ou "privado"

  @IsString()
  @IsNotEmpty()
  categoria: string; // Categoria dos resíduos

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;
}
