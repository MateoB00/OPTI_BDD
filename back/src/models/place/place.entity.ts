import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { Party } from '../party/party.entity';
import { User } from '../user/user.entity';

@Index('idx_place_region', ['region'])
@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  address: string;

  @Column()
  city: string;

  @Column()
  postalCode: string;

  @Column()
  region: string;

  @OneToMany(() => Party, (party) => party.place)
  party: Party[];

  @ManyToOne(() => User, (user) => user.places)
  user: User;
}
