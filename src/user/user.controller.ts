import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post, Put,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import {UserCreateDto} from "./models/user.create.dto";
import * as bcrypt from 'bcrypt';
import {AuthGuard} from "../auth/auth.guard";

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class UserController {

    constructor(private userService: UserService) {
    }
    @Get()
    async all(): Promise<User[]>{
        return await this.userService.all();
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User>{
        const password = await bcrypt.hash('1234', 10);

        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password
        })
    }

    @Get(':id')
    async get(@Param('id') id: number){
        return this.userService.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UserCreateDto
        ){
        return this.userService.update(id, body);
    }

}
