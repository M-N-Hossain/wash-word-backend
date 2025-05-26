import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('problem')
export class Problem {
  @PrimaryGeneratedColumn('uuid', { name: 'problem_id' })
  id: string;

  @Column({ name: 'problem_type', type: 'varchar' })
  problemType: string;
}
