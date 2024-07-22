import {
    BadRequestException,
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
        const password = this.hashedPassword('1234');;

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
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string
    ){
        if (password_confirm !== password){
            throw new BadRequestException("passwords do not match");
        }
        const id = await this.authService.userId(request);
        const hashed = this.hashedPassword(password);
        await this.userService.update(id, {
            password: hashed
        });

        return this.userService.findOne({id});


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

    async hashedPassword(password: string){
        return await bcrypt.hash(password, 10);
    }

}
