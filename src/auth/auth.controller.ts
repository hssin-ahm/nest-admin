import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;

@Controller()
export class AuthController {
constructor(
  private userService: UserService
) {
}
  @Post('register')
  async register(@Body() data) {

    const hash = await bcrypt.hash(data.password, saltOrRounds);
    return this.userService.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hash
    });
  }
}
