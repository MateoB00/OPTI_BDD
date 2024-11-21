import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Party } from './party.entity';

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

  @ManyToOne(() => Party, (party) => party.typeParty)
  parties: Party[];
}