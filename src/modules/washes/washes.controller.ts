import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateWashesDto } from './dto/create-washes.dto';
import { Wash } from './entities/wash.entity';
import { WashesService } from './washes.service';

@ApiTags('washes')
@Controller('api/washes')
export class WashesController {
  constructor(private readonly washesService: WashesService) {}

  @ApiOperation({ summary: 'Create a new wash record' })
  @ApiResponse({
    status: 201,
    description: 'Wash record created successfully',
    type: Wash,
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWashesDto: CreateWashesDto) {
    return this.washesService.create(createWashesDto);
  }

  @ApiOperation({ summary: 'Get wash records by user ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns wash records for the specified user',
    type: [Wash],
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findByUserId(@Param('id') id: number) {
    return this.washesService.findByUserId(id);
  }
}
