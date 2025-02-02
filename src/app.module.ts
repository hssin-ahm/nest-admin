import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import {RoleModule} from "./role/role/role.module";
import {PermissionModule} from "./permission/permission/permission.module";
import {ProductModule} from "./product/product.module";
import {OrderModule} from "./order/order.module";
import {APP_GUARD} from "@nestjs/core";
import {PermissionGuard} from "./permission/permission/permission.guard";


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    ProductModule,
    OrderModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    }
  ]
})
export class AppModule {}
