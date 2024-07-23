import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OrderItem} from "./orderItem.entity";
import {Expose,Exclude } from "class-transformer";
@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Exclude()
    first_name: string;
    @Column()
    @Exclude()
    last_name: string;
    @Column()
    email: string;
    @CreateDateColumn()
    created_at: string;

    @OneToMany(() => OrderItem, orderItem=> orderItem.order)
    orderItems: OrderItem[];

    @Expose()
    get name(): string{
        return `${this.first_name} ${this.last_name}`;
    }

    @Expose()
    get total(): number{
        return this.orderItems.reduce((sum, i)=> sum + i.quantity * i.price,0)
    }
}