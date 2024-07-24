import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {PermissionService} from "../../permission/permission/permission.service";
import {HasPermission} from "./has-permission.decorator";
import {AuthGuard} from "../../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('permissions')
export class PermissionController {

    constructor(private permissionService: PermissionService) {
    }

    @Get()
    @HasPermission('view_permissions')
    async all(){
        return this.permissionService.all();
    }

    @Post()
    async create(@Body('name') name: string){
        return this.permissionService.create({name})
    }
}
