import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PontosService } from './pontos.service';
import { CreatePontoDto } from './dto/create-ponto.dto';
import { UpdatePontoDto } from './dto/update-ponto.dto';

@Controller('pontos')
export class PontosController {
  constructor(private readonly pontosService: PontosService) {}

  @Post()
  create(@Body() createPontoDto: CreatePontoDto) {
    return this.pontosService.create(createPontoDto);
  }

  @Get()
  findAll() {
    return this.pontosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pontosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePontoDto: UpdatePontoDto) {
    return this.pontosService.update(+id, updatePontoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pontosService.remove(+id);
  }
}
