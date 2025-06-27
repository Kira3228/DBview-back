import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return this.userRepository.save(user);
  }
  async createMany(@Body() dto: CreateUserDto[]) {
    const user = await this.userRepository.create(dto);
    return this.userRepository.save(user);
  }
}
