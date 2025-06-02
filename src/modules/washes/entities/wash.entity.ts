import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FeedbackReport } from 'src/modules/feedback/entities/feedback-report.entity';
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

@Entity('washes')
export class Wash {
  @ApiProperty({
    description: 'The unique identifier of the wash record',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'wash_id' })
  id: string;

  @ApiProperty({
    description: 'The date and time when the wash occurred',
    example: '2023-01-01T12:00:00Z',
  })
  @Column({
    name: 'wash_datetime',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  washDatetime: Date;

  @ApiProperty({
    description: 'The number of points gained from this wash',
    example: 50,
  })
  @Column({ name: 'points_gained', type: 'int', default: 0 })
  pointsGained: number;

  @ApiProperty({
    description: 'The user who received the wash',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.washes)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @ApiProperty({
    description: 'The ID of the user who received the wash',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'fk_user_id' })
  userId: string;

  @ApiProperty({
    description: 'Whether a reward was used for this wash',
    example: false,
  })
  @Column({ type: 'boolean', default: false })
  reward: boolean;

  @ApiPropertyOptional({
    description: 'The location where the wash took place',
    example: 'Main Street Wash Hall',
  })
  @Column({ name: 'wash_location', nullable: true })
  washLocation?: string;

  @ApiPropertyOptional({
    description: 'The reward used for this wash, if any',
    type: () => Reward,
  })
  @ManyToOne(() => Reward)
  @JoinColumn({ name: 'fk_reward_id' })
  rewardUsed: Reward;

  @ApiPropertyOptional({
    description: 'The ID of the reward used for this wash, if any',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'fk_reward_id', nullable: true })
  rewardId?: string;

  @ApiPropertyOptional({
    description: 'The feedback report associated with this wash, if any',
    type: () => FeedbackReport,
  })
  @OneToOne(() => FeedbackReport, (feedbackReport) => feedbackReport.wash, {
    nullable: true,
  })
  feedbackReport?: FeedbackReport;
}
