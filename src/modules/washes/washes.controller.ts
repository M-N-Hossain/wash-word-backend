import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WashesService } from './washes.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateWashesDto } from './dto/create-washes.dto';

@Controller('api/washes')
export class WashesController {
  constructor(private readonly washesService: WashesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWashesDto: CreateWashesDto) {
    return this.washesService.create(createWashesDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByUserId(@Param('id') id: number) {
    return this.washesService.findByUserId(id);
  }
}
