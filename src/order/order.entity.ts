import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OrderItem} from "./orderItem.entity";
@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    email: string;
    @CreateDateColumn()
    created_at: string;

    @OneToMany(() => OrderItem, orderItem=> orderItem.order)
    orderItems: OrderItem[];
}