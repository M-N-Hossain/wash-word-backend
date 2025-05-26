import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wash } from './entities/wash.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wash])],
  exports: [TypeOrmModule],
})
export class WashesModule {}
