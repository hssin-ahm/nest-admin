import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }
  canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest<Request>();
    try {
      const jwt = request.cookies['jwt'];
      console.log(jwt);
      return this.jwtService.verify(jwt);
    }catch (e){
      return false;
    }
  }
}
