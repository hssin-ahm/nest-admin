import {Controller, Get, Query} from '@nestjs/common';
import {OrderService} from "./order.service";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService) {
    }

    @Get('orders ')
    async all(@Query('page') page= 1){
        return this.orderService.paginate(page, ['orderItems']);
    }
}
