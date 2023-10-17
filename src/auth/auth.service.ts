import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatches) {
      return null;
    }

    const { id, name } = user;

    return {
      id,
      name,
    };
  }
}
