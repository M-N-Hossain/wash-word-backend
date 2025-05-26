import { Membership } from 'src/common/enums/membership.enum';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { FeedbackReport } from '../../feedback/entities/feedback-report.entity';
import { UserReward } from '../../rewards/entities/user-reward.entity';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Wash } from '../../washes/entities/wash.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @Column({ type: 'int', default: 0 })
  points: number;

  @Column({
    type: 'enum',
    enum: Membership,
    default: Membership.GOLD,
  })
  membership: Membership;

  @ManyToOne(() => Subscription)
  @JoinColumn({ name: 'fk_sub_id' })
  subscription: Subscription;

  @Column({ name: 'fk_sub_id' })
  subscriptionId: string;

  @OneToMany(() => UserReward, (userReward) => userReward.user)
  userRewards: UserReward[];

  @OneToMany(() => Wash, (wash) => wash.user)
  washes: Wash[];

  @OneToMany(() => FeedbackReport, (feedbackReport) => feedbackReport.user)
  feedbackReports: FeedbackReport[];
}
