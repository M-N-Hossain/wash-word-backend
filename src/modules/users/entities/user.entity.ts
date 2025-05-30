import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'The hashed password of the user',
    example: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
    writeOnly: true,
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'The date when the user was created',
    example: '2023-01-01T00:00:00Z',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the user was last updated',
    example: '2023-01-01T00:00:00Z',
  })
  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    description: "The license plate of the user's vehicle",
    example: 'ABC123',
  })
  @Column({ name: 'license_plate' })
  licensePlate: string;

  @ApiProperty({
    description: 'The number of reward points accumulated by the user',
    example: 150,
  })
  @Column({ type: 'int', default: 0 })
  points: number;

  @ApiProperty({
    description: 'The subscription associated with the user',
    type: () => Subscription,
  })
  @ManyToOne(() => Subscription)
  @JoinColumn({ name: 'fk_sub_id' })
  subscription: Subscription;

  @ApiProperty({
    description: 'The ID of the subscription associated with the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ name: 'fk_sub_id' })
  subscriptionId: string;

  @ApiProperty({
    description: 'The rewards redeemed by the user',
    type: () => [UserReward],
  })
  @OneToMany(() => UserReward, (userReward) => userReward.user)
  userRewards: UserReward[];

  @ApiProperty({
    description: 'The wash history of the user',
    type: () => [Wash],
  })
  @OneToMany(() => Wash, (wash) => wash.user)
  washes: Wash[];

  @ApiProperty({
    description: 'The feedback reports submitted by the user',
    type: () => [FeedbackReport],
  })
  @OneToMany(() => FeedbackReport, (feedbackReport) => feedbackReport.user)
  feedbackReports: FeedbackReport[];
}
