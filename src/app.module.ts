import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import {RoleModule} from "./role/role/role.module";
import {PermissionModule} from "./permission/permission/permission.module";


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
