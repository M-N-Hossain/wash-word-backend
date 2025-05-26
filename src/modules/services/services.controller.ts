import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Membership } from 'src/common/enums/membership.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Get('membership/:type')
  @UseGuards(JwtAuthGuard)
  getServicesByMembership(@Param('type') type: string) {
    return this.servicesService.getServicesByMembership(type as Membership);
  }
}
