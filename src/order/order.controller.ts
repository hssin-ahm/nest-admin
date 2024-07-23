import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {OrderService} from "./order.service";
import {OrderCreateDto} from "./models/order.create.dto";
import {OrderItemsCreateDto} from "./models/orderItems.create.dto";
import {OrderItemsService} from "./orderItems.service";

@Controller()
export class OrderController {
    constructor(private orderService: OrderService, private orderItemsService: OrderItemsService) {
    }

    @Get('orders')
    async all(@Query('page') page= 1){
        return this.orderService.paginate(page, ['orderItems']);
    }

    @Post('orders')
    async create(@Body() order: OrderCreateDto){
        const {orderItems, ...data} = order;
        return this.orderService.create({
            ...data,
            orderItems: orderItems.map(id=> ({id}))
        });
    }

    @Post('orders/orderItem')
    async createOrderItems(@Body() orderItem: OrderItemsCreateDto){
        return this.orderItemsService.create(orderItem);
    }
    @Get('orders/orderItems')
    async allOrderItems(@Query('page') page= 1){
        return this.orderItemsService.paginate(page);
    }

}
