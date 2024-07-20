import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {Exclude} from "class-transformer/types/decorators";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  @Exclude()
  password: string;

}