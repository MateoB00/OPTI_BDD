import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Party } from '../party/party.entity';

@Index('idx_typeParty_type', ['type'])
@Entity()
export class TypeParty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array', { array: true, nullable: true })
  namesGames: string[];

  @Column({ nullable: true })
  platformVideoGames: string;

  @Column({
    type: 'enum',
    enum: ['Video Games', 'Board Games', 'Classic'],
  })
  type: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Party, (party) => party.typeParty)
  parties: Party[];
}
