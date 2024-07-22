import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import {AbstractService} from "../common/abstract.service";
import {PaginationResult} from "../common/pagination-result.interface";

@Injectable()
export class UserService extends AbstractService{
  constructor(@InjectRepository(User) readonly userRepository: Repository<User>) {
    super(userRepository);
  }


  async paginate(page = 1): Promise<PaginationResult>{
    const {data, meta} = await super.paginate(page);
    return {
      data: data.map(user =>{
        const {password, ...data} = user
        return data;
      }), meta
    }
  }


}
