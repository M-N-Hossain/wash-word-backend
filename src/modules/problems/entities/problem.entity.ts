import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('problem')
export class Problem {
  @ApiProperty({
    description: 'The unique identifier of the problem category',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'problem_id' })
  id: string;

  @ApiProperty({
    description: 'The type or category of the problem',
    example: 'Water Pressure Issue',
  })
  @Column({ name: 'problem_type', type: 'varchar' })
  problemType: string;
}
