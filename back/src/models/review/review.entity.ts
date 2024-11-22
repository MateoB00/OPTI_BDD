import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Party } from '../party/party.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => User, (user) => user.authorReviews)
  author: User;

  @ManyToOne(() => User, (user) => user.reviews, { nullable: true })
  targetUser: User;

  @ManyToOne(() => Party, (party) => party.reviews, { nullable: true })
  targetParty: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
