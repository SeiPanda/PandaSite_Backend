import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginService } from './login/login.service';

@Controller('auth')
export class AuthController {
  constructor(private loginService: LoginService) {}

  @HttpCode(200)
  @Post('login')
  signIn(
    @Body() signInDto: Record<string, string>,
  ): Promise<{ access_token: string }> {
    return this.loginService.login(signInDto.username, signInDto.password);
  }
}
