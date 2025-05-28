import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reward } from '../../rewards/entities/reward.entity';
import { User } from '../../users/entities/user.entity';
import { FeedbackReport } from 'src/modules/feedback/entities/feedback-report.entity';

@Entity('washes')
export class Wash {
  @PrimaryGeneratedColumn('uuid', { name: 'wash_id' })
  id: string;

  @Column({
    name: 'wash_datetime',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  washDatetime: Date;

  @Column({ name: 'points_gained', type: 'int', default: 0 })
  pointsGained: number;

  @ManyToOne(() => User, (user) => user.washes)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column({ name: 'fk_user_id' })
  userId: string;

  @Column({ type: 'boolean', default: false })
  reward: boolean;

  @Column({ name: 'wash_location', nullable: true })
  washLocation?: string;

  @ManyToOne(() => Reward)
  @JoinColumn({ name: 'fk_reward_id' })
  rewardUsed: Reward;

  @Column({ name: 'fk_reward_id', nullable: true })
  rewardId?: string;

  @OneToOne(() => FeedbackReport, (feedbackReport) => feedbackReport.wash, {
    nullable: true,
  })
  feedbackReport?: FeedbackReport;
}
