import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reason } from './reason.entity';
import { Wash } from 'src/modules/wash/entities/wash.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  feedback_id: number;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToMany(() => Reason, (reason) => reason.feedbacks)
  reasons: Reason[];

  @OneToOne(() => Wash, (wash) => wash.feedback)
  @JoinColumn()
  wash: Wash;
}
