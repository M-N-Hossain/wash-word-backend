import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { WashService } from './wash.service';
import { CreateWashDto } from './dto/create-wash.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wash')
export class WashController {
  constructor(private readonly washService: WashService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWashDto: CreateWashDto) {
    return this.washService.create(createWashDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByUserId(@Param('id') id: number) {
    return this.washService.findByUserId(id);
  }
}
