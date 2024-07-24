import {Body, ClassSerializerInterceptor, Controller, Get, Post, Query, Res, UseInterceptors} from '@nestjs/common';
import {OrderService} from "./order.service";
import {OrderCreateDto} from "./models/order.create.dto";
import {OrderItemsCreateDto} from "./models/orderItems.create.dto";
import {OrderItemsService} from "./orderItems.service";
import {Response} from "express";
import {Parser} from "json2csv";
import {Order} from "./order.entity";
import {OrderItem} from "./orderItem.entity";
import {HasPermission} from "../permission/permission/has-permission.decorator";

@Controller('orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
    constructor(private orderService: OrderService, private orderItemsService: OrderItemsService) {
    }

    @Get()
    @HasPermission('orders')
    async all(@Query('page') page= 1){
        return this.orderService.paginate(page, ['orderItems']);
    }

    @Post('export')
    @HasPermission('orders')
    async export(@Res() res: Response){
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });
        const orders = await this.orderService.all(['orderItems']);

        const json = [];
        orders.forEach((o: Order) => {
            json.push({
                ID: o.id,
                Name: o.name,
                Email: o.email,
                'Product Title':'',
                Price: '',
                Quantity: ''
            })
            o.orderItems.forEach((oi: OrderItem) =>{
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    'Product Title': oi.product_title,
                    Price: oi.price,
                    Quantity: oi.quantity
                })
            })
        })

        const csv = parser.parse(json);
        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        return res.send(csv);
    }

    @Get('chart')
    @HasPermission('orders')
    async chart(){
        return this.orderService.chat();
    }

    @Post()
    @HasPermission('orders')
    async create(@Body() order: OrderCreateDto){
        const {orderItems, ...data} = order;
        return this.orderService.create({
            ...data,
            orderItems: orderItems.map(id=> ({id}))
        });
    }

    @Post('orderItem')
    @HasPermission('orders')
    async createOrderItems(@Body() orderItem: OrderItemsCreateDto){
        return this.orderItemsService.create(orderItem);
    }
    @Get('orderItems')
    @HasPermission('orders')
    async allOrderItems(@Query('page') page= 1){
        return this.orderItemsService.paginate(page);
    }

}
