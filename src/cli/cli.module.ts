import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportCommand } from './commands/import.command';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'panda_website',
      autoLoadEntities: true,
      synchronize: false,
      logging: false,
    }),
  ],
  providers: [ImportCommand],
})
export class CliModule {}
