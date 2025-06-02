import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Wash } from 'src/modules/washes/entities/wash.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('feedback_report')
export class FeedbackReport {
  @ApiProperty({
    description: 'The unique identifier of the feedback report',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_id' })
  id: string;

  @ApiProperty({
    description: 'The title of the feedback report',
    example: 'Great Service',
  })
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({
    description: 'The detailed description of the feedback',
    example: 'The staff was very friendly and helpful',
  })
  @Column({ type: 'varchar' })
  description: string;

  @ApiProperty({
    description: 'The rating given by the user (1-5)',
    example: 5,
    enum: [1, 2, 3, 4, 5],
  })
  @Column({ type: 'enum', enum: [1, 2, 3, 4, 5] })
  rating: number;

  @ApiPropertyOptional({
    description: 'Problem description (if any)',
    example: 'Water pressure issue',
  })
  @Column({ type: 'varchar', nullable: true })
  problemDescription?: string;

  @ApiProperty({
    description: 'The user who submitted the feedback',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.feedbackReports)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @ApiProperty({
    description: 'The ID of the user who submitted the feedback',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'fk_user_id' })
  userId: string;

  @ApiProperty({
    description: 'The wash associated with this feedback',
    type: () => Wash,
  })
  @OneToOne(() => Wash, (wash) => wash.feedbackReport)
  @JoinColumn({ name: 'fk_wash_id' })
  wash?: Wash;

  @ApiProperty({
    description: 'The ID of the associated wash',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'fk_wash_id' })
  washId: string;
}
