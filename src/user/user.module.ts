import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import {CommonModule} from "../common/common.module";
import {AuthModule} from "../auth/auth.module";
import {ProductModule} from "../product/product.module";

@Module({

  imports:[
      TypeOrmModule.forFeature([User]),
      CommonModule,
      AuthModule,
      ProductModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
