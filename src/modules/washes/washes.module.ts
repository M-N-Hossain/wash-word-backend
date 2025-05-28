import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wash } from './entities/wash.entity';
import { WashesController } from './washes.controller';
import { WashesService } from './washes.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wash]), UsersModule],
  providers: [WashesService],
  controllers: [WashesController],
  exports: [TypeOrmModule],
})
export class WashesModule {}
