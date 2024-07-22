import {
    Body,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get,
    Param,
    Post, Put, Query, Req,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import {UserCreateDto} from "./models/user.create.dto";
import * as bcrypt from 'bcrypt';
import {AuthGuard} from "../auth/auth.guard";
import {AuthService} from "../auth/auth.service";
import {UserUpdateDto} from "./models/user.update.dto";
import {Request} from "express";
import {PaginationResult} from "../common/pagination-result.interface";

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
export class UserController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {
    }
    @Get()
    async all(@Query('page') page: number = 1): Promise<PaginationResult>{
        return await this.userService.paginate(page);
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User>{
        const password = await bcrypt.hash('1234', 10);

        const {role_id, ...data} = body;

        return this.userService.create({
            ...data,
            password,
            role: {id: role_id}
        })
    }

    @Get(':id')
    async get(@Param('id') id: number){
        return this.userService.findOne({id});
    }

    @Put('info')
    async updateInfo(
        @Req() request: Request,
        @Body() body: UserUpdateDto
    ) {
        const id = await this.authService.userId(request)
        await this.userService.update(id, body);
        return this.userService.findOne({id});

    }
    @Put()
    async updatePassword(){

    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UserUpdateDto
        ){
        const {role_id, ...data} = body;
        await this.userService.update(id, {...data, role:{id: role_id}});
        return this.userService.findOne({id});
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number
    ){
        return this.userService.delete(id);
    }

}
