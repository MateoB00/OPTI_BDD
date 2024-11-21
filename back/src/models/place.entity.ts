import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;
}