
import { IsEmail, IsNotEmpty } from 'class-validator';
export class OrderCreateDto{
    @IsNotEmpty()
    first_name: string;
    @IsNotEmpty()
    last_name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    orderItems: number[];
}