import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Party } from '../party/party.entity';
import { User } from '../user/user.entity';

@Entity()
export class ContributionParty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  game: string;

  @Column({ nullable: true })
  food: string;

  @ManyToOne(() => Party, (party) => party.contributionsParty)
  party: Party;

  @ManyToOne(() => User, (user) => user.contributionsParty)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
