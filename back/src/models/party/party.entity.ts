import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { User } from '../user/user.entity';
import { TypeParty } from '../type-party/type-party.entity';
import { Participant } from '../participant/participant.entity';
import { ContributionParty } from '../contribution-party/contribution-party.entity';
import { Place } from '../place/place.entity';
import { Review } from '../review/review.entity';

@Entity()
@Index('idx_party_status', ['status'])
@Index('idx_party_started', ['startedAt'])
@Index('idx_party_organizer', ['organizer'])
@Index('idx_party_typeParty', ['typeParty'])
@Index('idx_party_place', ['place'])
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

  @Column({ type: 'timestamp' })
  startedAt: Date;

  @Column({ type: 'timestamp' })
  endedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.parties)
  organizer: User;

  @ManyToOne(() => TypeParty, (typeParty) => typeParty.parties)
  typeParty: TypeParty;

  @ManyToOne(() => Place, (place) => place.party)
  place: Place;

  @OneToMany(() => Participant, (participant) => participant.party)
  participations: Participant[];

  @OneToMany(
    () => ContributionParty,
    (contributionParty) => contributionParty.party,
  )
  contributionsParty: ContributionParty[];

  @OneToMany(() => Review, (review) => review.targetParty)
  reviews: Review[];
}
