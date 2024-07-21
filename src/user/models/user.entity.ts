import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';
import {Role} from "../../role/role/role.entity";

@Entity()
export class User {

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

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

  @ManyToOne(() => Role)
  @JoinColumn({name: 'role_id'})
  role: Role;

}