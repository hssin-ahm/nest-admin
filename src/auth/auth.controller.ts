import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
const saltOrRounds = 10;

@Controller()
export class AuthController {
constructor(
  private userService: UserService
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
              @Body("passwword") password: string){
    const user = await this.userService.findOne({email: email});
    if(!user){
      throw new NotFoundException("User Not Found");
    }

    if(!await bcrypt.compare(password, user.password)){
      throw new BadRequestException("Invalid Credentials")
    }

    return user;
  }
}
