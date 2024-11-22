import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class CenterOfInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  centerOfInterest: string;

  @ManyToOne(() => User, (user) => user.centersOfInterests)
  user: User;
}
