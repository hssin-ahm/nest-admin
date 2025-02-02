import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Permission} from "./permission.entity";
import {AbstractService} from "../../common/abstract.service";
@Injectable()
export class PermissionService extends AbstractService{

    constructor(@InjectRepository(Permission) readonly permissionRepository: Repository<Permission>) {
        super(permissionRepository);
    }


}
