import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {PermissionService} from "../../permission/permission/permission.service";
import {AuthGuard} from "../../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {

    constructor(private permissionService: PermissionService) {
    }

    @Get()
    async all(){
        return this.permissionService.all();
    }

    @Post()
    async create(@Body('name') name: string){
        return this.permissionService.create({name})
    }
}
