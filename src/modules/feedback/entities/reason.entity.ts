import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Feedback } from './feedback.entity';

@Entity()
export class Reason {
  @PrimaryGeneratedColumn()
  reason_id: number;

  @Column()
  reason_type: string;

  @ManyToMany(() => Feedback, (feedback) => feedback.reasons)
  feedbacks: Feedback[];
}
