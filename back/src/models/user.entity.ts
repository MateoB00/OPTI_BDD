import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CenterOfInterest } from './center-of-interest.entity';
import { Message } from './message.entity';
import { Party } from './party.entity';
import { Participant } from './participant.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => CenterOfInterest, (centerOfInterest) => centerOfInterest.user)
  centersOfInterests: CenterOfInterest[];

  @OneToMany(() => Participant, (participant) => participant.user)
  participations: Participant[];

  @OneToMany(() => Party, (party) => party.organizer)
  parties: Party[];

  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.recipient)
  receivedMessages: Message[];
}

