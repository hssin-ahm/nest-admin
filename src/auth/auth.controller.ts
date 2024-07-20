import {BadRequestException, Body, Controller, Get, NotFoundException, Post, Req, Res} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import {JwtService} from "@nestjs/jwt";
import {Request, Response} from "express";

const saltOrRounds = 10;

@Controller()
export class AuthController {
constructor(
  private userService: UserService,
  private jwtService: JwtService
) {
}
  @Post('register')
  async register(@Body() data: RegisterDto) {

  if (data.password_confirm !== data.password){
    throw new BadRequestException("passwords do not match");
  }

    const hash = await bcrypt.hash(data.password, saltOrRounds);
    return this.userService.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hash
    });
  }

  @Post("login")
  async login(@Body("email") email: string,
              @Body("password") password: string,
              @Res({passthrough: true}) response: Response
              ){
    const user = await this.userService.findOne(email);
    if(!user){
      throw new NotFoundException("User Not Found");
    }

    if(!await bcrypt.compare(password, user.password)){
      throw new BadRequestException("Invalid Credentials")
    }
    const jwt = this.jwtService.signAsync({id: user.id})


    response.cookie('jwt', jwt, {httpOnly:true});

    return user;
  }


  @Get('user')
  async user(@Req() request: Request){
    console.log(request.cookies);
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    return data;
  }

}
