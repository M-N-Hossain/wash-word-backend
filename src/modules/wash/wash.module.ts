import { Module } from '@nestjs/common';
import { WashController } from './wash.controller';
import { WashService } from './wash.service';

@Module({
  controllers: [WashController],
  providers: [WashService],
})
export class WashModule {}
