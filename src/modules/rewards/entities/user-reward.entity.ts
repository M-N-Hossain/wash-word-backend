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
  @PrimaryGeneratedColumn('uuid', { name: 'user_rewards_id' })
  id: string;

  @ManyToOne(() => User, (user) => user.userRewards)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column({ name: 'fk_user_id' })
  userId: string;

  @ManyToOne(() => Reward, (reward) => reward.userRewards)
  @JoinColumn({ name: 'fk_rewards_id' })
  reward: Reward;

  @Column({ name: 'fk_rewards_id' })
  rewardId: string;

  @Column({ name: 'date_redeem', type: 'date', nullable: true })
  dateRedeem: Date;
}
