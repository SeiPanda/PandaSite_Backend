import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { ImageController } from './image/image.controller';
import { ImageService } from './image/image.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BookModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('DATABASE_SYNC'), // To be removed in production - might cause data loss!
        logging: true,
        maxQueryExecutionTime: 1000, // Log Queries with more than 1s execution time
      }),
    }),
    /* To be enabled with static image serving */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
      exclude: ['/api/(.*)'],
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
  ],
  controllers: [AppController, ImageController],
  providers: [AppService, ImageService],
})
export class AppModule {}
