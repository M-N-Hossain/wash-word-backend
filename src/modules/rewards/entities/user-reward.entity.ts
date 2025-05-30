import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Reward } from './reward.entity';

@Entity('user_rewards')
export class UserReward {
  @ApiProperty({
    description: 'The unique identifier of the user reward record',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'user_rewards_id' })
  id: string;

  @ApiProperty({
    description: 'The user who redeemed the reward',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.userRewards)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @ApiProperty({
    description: 'The ID of the user who redeemed the reward',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'fk_user_id' })
  userId: string;

  @ApiProperty({
    description: 'The reward that was redeemed',
    type: () => Reward,
  })
  @ManyToOne(() => Reward, (reward) => reward.userRewards)
  @JoinColumn({ name: 'fk_rewards_id' })
  reward: Reward;

  @ApiProperty({
    description: 'The ID of the reward that was redeemed',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'fk_rewards_id' })
  rewardId: string;

  @ApiProperty({
    description: 'The date when the reward was redeemed',
    example: '2023-01-01',
  })
  @Column({ name: 'date_redeem', type: 'date', nullable: true })
  dateRedeem: Date;
}
