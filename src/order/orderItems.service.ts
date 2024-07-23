import {Injectable} from "@nestjs/common";
import {AbstractService} from "../common/abstract.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OrderItem} from "./orderItem.entity";

@Injectable()
export class OrderItemsService extends AbstractService{
    constructor(@InjectRepository(OrderItem) private readonly orderItemsRepository: Repository<OrderItem>) {
        super(orderItemsRepository);
    }

}
