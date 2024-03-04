import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImportCommand } from './commands/import.command';
import { RecipeService } from 'src/recipe/recipe.service';
import { DifficultyService } from 'src/difficulty/difficulty.service';

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
  providers: [ImportCommand, RecipeService, DifficultyService],
})
export class CliModule {}
