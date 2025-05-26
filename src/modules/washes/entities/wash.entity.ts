import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reward } from '../../rewards/entities/reward.entity';
import { User } from '../../users/entities/user.entity';
import { WashHall } from '../../wash-halls/entities/wash-hall.entity';

@Entity('washes')
export class Wash {
  @PrimaryGeneratedColumn('uuid', { name: 'wash_id' })
  id: string;

  @Column({ name: 'wash_datetime', type: 'timestamp' })
  washDatetime: Date;

  @ManyToOne(() => WashHall)
  @JoinColumn({ name: 'fk_wash_hall_id' })
  washHall: WashHall;

  @Column({ name: 'fk_wash_hall_id' })
  washHallId: string;

  @Column({ name: 'points_gained', type: 'int', default: 0 })
  pointsGained: number;

  @Column({ name: 'fk_feedback_id', nullable: true })
  feedbackId: string;

  @ManyToOne(() => User, (user) => user.washes)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column({ name: 'fk_user_id' })
  userId: string;

  @Column({ type: 'boolean', default: false })
  reward: boolean;

  @ManyToOne(() => Reward)
  @JoinColumn({ name: 'fk_reward_id' })
  rewardUsed: Reward;

  @Column({ name: 'fk_reward_id', nullable: true })
  rewardId: string;
}
