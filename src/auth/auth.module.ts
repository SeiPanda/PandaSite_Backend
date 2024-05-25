import { Module } from '@nestjs/common';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${
            configService.get<number>('JWT_LIFETIME_SECONDS') ?? 60
          }s`,
        },
      }),
    }),
  ],
  providers: [LoginService, LogoutService, AuthGuard],
  exports: [LoginService, LogoutService, AuthGuard, JwtModule, ConfigModule],
})
export class AuthModule {}
