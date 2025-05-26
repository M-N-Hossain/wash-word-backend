import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { UserReward } from './entities/user-reward.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reward, UserReward])],
  exports: [TypeOrmModule],
})
export class RewardsModule {}
