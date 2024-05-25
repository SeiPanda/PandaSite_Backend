import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoginService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Username/Password not correct!');
    }

    const jwtSignPayload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(jwtSignPayload),
    };
  }
}
