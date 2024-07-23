
import { IsEmail, IsNotEmpty } from 'class-validator';
export class OrderItemsCreateDto{
    @IsNotEmpty()
    product_title: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    price: number
    @IsNotEmpty()
    quantity: number;
}