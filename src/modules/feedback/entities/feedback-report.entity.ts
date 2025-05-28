import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Problem } from '../../problems/entities/problem.entity';
import { User } from '../../users/entities/user.entity';
import { Wash } from 'src/modules/washes/entities/wash.entity';

@Entity('feedback_report')
export class FeedbackReport {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_id' })
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'enum', enum: ['poor', 'average', 'good', 'excellent'] })
  rating: string;

  @ManyToOne(() => Problem)
  @JoinColumn({ name: 'fk_problem_id' })
  problem: Problem;

  @Column({ name: 'fk_problem_id', nullable: true })
  problemId: string;

  @ManyToOne(() => User, (user) => user.feedbackReports)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;

  @Column({ name: 'fk_user_id' })
  userId: string;

  @OneToOne(() => Wash, (wash) => wash.feedbackReport)
  @JoinColumn({ name: 'fk_wash_id' })
  wash?: Wash;

  @Column({ name: 'fk_wash_id' })
  washId: string;
}
