import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });
  }

 async create(createUserDto: CreateUserDto) {
    return await this.client
      .send<string, CreateUserDto>('db/user', createUserDto)
      .pipe();
  }

  login(loginUserDto: LoginUserDto) {
    return this.client.send<string, LoginUserDto>(
      '/db/user/login',
      loginUserDto,
    );
  }

  findOne(id: string) {
    return this.client.send<string, string>('db/user/get', id);
  }
}
