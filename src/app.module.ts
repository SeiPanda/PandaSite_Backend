import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublisherModule } from './publisher/publisher.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { RecipeModule } from './recipe/recipe.module';
import { ProjectModule } from './project/project.module';
import { TimeUnitModule } from './time-unit/time-unit.module';
import { DifficultyModule } from './difficulty/difficulty.module';
import { CategoryModule } from './category/category.module';
import { UtilModule } from './util/util.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { AmountUnitModule } from './amount-unit/amount-unit.module';
import { InstructionModule } from './instruction/instruction.module';
import { InstructionIngredientModule } from './instruction_ingredient/instruction_ingredient.module';
import { RecipeIngredientModule } from './recipe_ingredient/recipe_ingredient.module';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'panda_website',
      autoLoadEntities: true,
      synchronize: true, // To be removed in production - might cause data loss!
      logging: true,
      maxQueryExecutionTime: 1000, // Log Queries with more than 1s execution time
    }),
    PublisherModule,
    AuthorModule,
    GenreModule,
    RecipeModule,
    ProjectModule,
    TimeUnitModule,
    DifficultyModule,
    CategoryModule,
    UtilModule,
    IngredientModule,
    AmountUnitModule,
    InstructionModule,
    InstructionIngredientModule,
    RecipeIngredientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
