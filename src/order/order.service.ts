import { Injectable } from '@nestjs/common';
import {AbstractService} from "../common/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Order} from "./order.entity";
import {Repository} from "typeorm";
import {PaginationResult} from "../common/pagination-result.interface";

@Injectable()
export class OrderService extends AbstractService{
    constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {
        super(orderRepository);
    }


    async paginate(page = 1): Promise<PaginationResult>{
        const {data, meta} = await super.paginate(page);
        return {
            data: data.map((order :Order) =>({
                id: order.id,
                name: order.name,
                total:order.total,
                created_at: order.created_at,
                order_items: order.orderItems
            })), meta
        }
    }

}
