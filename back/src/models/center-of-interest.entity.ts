import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class CenterOfInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  centerOfInterest: string;

  @ManyToOne(() => User, (user) => user.centersOfInterests)
  user: User;
}