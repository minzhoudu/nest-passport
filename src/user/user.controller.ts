import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.findAllUsers();

    if (!users) throw new NotFoundException('No users found');

    return users;
  }

  @Post()
  async getUser(@Body('username') username: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) throw new NotFoundException('User with that username not found');

    return user;
  }

  @Post('new')
  async createUser(@Body() createUser: CreateUserDto) {
    return await this.userService.createUser(createUser);
  }
}
