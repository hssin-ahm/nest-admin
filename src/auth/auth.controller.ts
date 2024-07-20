import { Controller, Post, Get, Body, Res, Req, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import {JwtService} from "@nestjs/jwt";

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
  async login(
      @Body("email") email: string,
      @Body("password") password: string,
      @Res({ passthrough: true }) response: Response
  ) {
    const user = await this.userService.findOne({email: email});
    if (!user) {
      throw new NotFoundException("User Not Found");
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException("Invalid Credentials");
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true, secure: false, sameSite: 'lax' }); // adjusted attributes

    return user;
  }

  @Get('user')
  async user(@Req() request: Request) {
    console.log('Cookies:', request.cookies); // Logging cookies

    const cookie = request.cookies['jwt'];
    if (!cookie) {
      throw new BadRequestException("No JWT found");
    }

    const data = await this.jwtService.verifyAsync(cookie);
    return this.userService.findOne({id: data['id']});
  }

}
