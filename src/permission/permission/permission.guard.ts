import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";
import {AuthService} from "../../auth/auth.service";
import {UserService} from "../../user/user.service";
import {RoleService} from "../../role/role/role.service";
import {User} from "../../user/models/user.entity";

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
      private reflector: Reflector,
      private authService: AuthService,
      private userService: UserService,
      private roleService: RoleService
      ) {
  }
  async canActivate(
    context: ExecutionContext,
  ) {
    const access = this.reflector.get<string>('access', context.getHandler());
    if (!access){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const id = await this.authService.userId(request);
    const user: User = await this.userService.findOne({id}, ['role']);
    const role = await this.roleService.findOne({id: user.role.id}, ['permissions']);

    console.log(role)
    console.log(access)
    return true;
  }
}
