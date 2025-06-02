import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('subscription')
export class Subscription {
  @ApiProperty({
    description: 'The unique identifier of the subscription',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid', { name: 'sub_id' })
  id: string;

  @ApiProperty({
    description: 'The name of the subscription tier',
    example: 'Gold',
  })
  @Column({ name: 'tier_name', type: 'varchar' })
  tierName: string;

  @ApiProperty({
    description: 'The description of the subscription plan',
    example: 'Gold subscription with limited washes',
  })
  @Column({ type: 'varchar' })
  description: string;

  @ApiProperty({
    description: 'The price of the subscription per month',
    example: 19.99,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'The users subscribed to this plan',
    type: () => [User],
  })
  @OneToMany(() => User, (user) => user.subscription)
  users: User[];
}
