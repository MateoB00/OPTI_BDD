import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ContributionParty {
  @PrimaryGeneratedColumn()
  id: number;
}