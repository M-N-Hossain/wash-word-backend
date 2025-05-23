import { Module } from '@nestjs/common';
import { WashController } from './wash.controller';
import { WashService } from './wash.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wash } from './entities/wash.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Wash]), UsersModule],
  controllers: [WashController],
  providers: [WashService],
})
export class WashModule {}
