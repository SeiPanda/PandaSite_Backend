import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  users: User[] = [
    {
      id: 1,
      username: this.configService.get<string>('DUMMY_USER'),
      password: this.configService.get<string>('DUMMY_USER_PASS'),
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

// TODO: Remove and replace with ORM Type!
export type User = { id: number; username: string; password: string };
