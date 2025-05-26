import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserReward } from './user-reward.entity';

@Entity('rewards')
export class Reward {
  @PrimaryGeneratedColumn('uuid', { name: 'reward_id' })
  id: string;

  @Column({ name: 'reward_name', type: 'varchar' })
  rewardName: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ name: 'point_required', type: 'int' })
  pointRequired: number;

  @Column({ type: 'boolean', default: true })
  redeemable: boolean;

  @OneToMany(() => UserReward, (userReward) => userReward.reward)
  userRewards: UserReward[];
}
