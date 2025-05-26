import { Membership } from 'src/common/enums/membership.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MembershipService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Membership,
  })
  membershipType: Membership;

  @Column()
  serviceId: string;

  @Column()
  isIncluded: boolean;
}
