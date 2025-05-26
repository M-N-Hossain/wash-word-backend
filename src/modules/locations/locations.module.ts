import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashLocation } from './entities/wash-location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WashLocation])],
  exports: [TypeOrmModule],
})
export class LocationsModule {}
