import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserReward } from './user-reward.entity';

@Entity('rewards')
export class Reward {
  @ApiProperty({
    description: 'The unique identifier of the reward',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'reward_id' })
  id: string;

  @ApiProperty({
    description: 'The name of the reward',
    example: 'Free Basic Wash',
  })
  @Column({ name: 'reward_name', type: 'varchar' })
  rewardName: string;

  @ApiProperty({
    description: 'The description of the reward',
    example: 'Get a free basic wash on your next visit',
  })
  @Column({ type: 'varchar' })
  description: string;

  @ApiProperty({
    description: 'The number of points required to redeem this reward',
    example: 100,
  })
  @Column({ name: 'point_required', type: 'int' })
  pointRequired: number;

  @ApiProperty({
    description: 'Whether the reward is currently available for redemption',
    example: true,
  })
  @Column({ type: 'boolean', default: true })
  redeemable: boolean;

  @ApiProperty({
    description: 'The users who have redeemed this reward',
    type: () => [UserReward],
  })
  @OneToMany(() => UserReward, (userReward) => userReward.reward)
  userRewards: UserReward[];
}
