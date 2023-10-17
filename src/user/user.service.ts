import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepo.findOneBy({ username });
  }

  async createUser(createUser: CreateUserDto) {
    const user = this.userRepo.create(createUser);
    user.password = await bcrypt.hash(createUser.password, 10);

    return await this.userRepo.save(user);
  }
}
