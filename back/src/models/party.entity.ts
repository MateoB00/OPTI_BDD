import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { TypeParty } from './type-party.entity';
import { Participant } from './participant.entity';

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  maxParticipants: number;

  @Column()
  isFree: boolean;

  @Column({
    type: 'enum',
    enum: ['Publish', 'In Progress', 'Closed', 'Deleted'],
  })
  status: string;

  @Column()
  contribution: boolean;

  @Column({ type: 'timestamp'})
  startedAt: Date;

  @Column({ type: 'timestamp' })
  endedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.parties)
  organizer: User;

  @ManyToOne(() => TypeParty, (typeParty) => typeParty.parties)
  typeParty: TypeParty;

  @OneToMany(() => Participant, (participant) => participant.party)
  participations: Participant[];
}