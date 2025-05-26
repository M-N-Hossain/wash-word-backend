import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WashHall } from './entities/wash-hall.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WashHall])],
  exports: [TypeOrmModule],
})
export class WashHallsModule {}
