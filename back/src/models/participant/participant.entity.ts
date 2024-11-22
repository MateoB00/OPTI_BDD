import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Party } from '../party/party.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paid: boolean;

  @Column({
    type: 'enum',
    enum: ['Pending', 'Accepted', 'Denied'],
  })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.participations)
  user: User;

  @ManyToOne(() => Party, (party) => party.participations)
  party: Party;
}
