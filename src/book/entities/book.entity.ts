import { Author } from 'src/author/entities/author.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    name: 'short_title',
    nullable: true
  })
  shortTitle: string;

  @Column({
    length: 50,
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    length: 400,
    nullable: true
  })
  quote: string;

  @Column({
    length: 50,
    name: 'sub_title',
    nullable: true
  })
  subTitle: string;

  @Column({
    default: 0
  })
  band: number;

  @Column({
    length: 80,
    name: 'book_series_title',
    nullable: true
  })
  bookSeriesTitle: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  publisher: Publisher;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @Column({
    default: false,
    name: 'is_reading_finished',

  }) 
  isReadingFinished: boolean;

  @Column({
    default: false,
    name: 'is_current_read',
  }) 
  isCurrentRead: boolean;

  @Column({
    default: false,
    name: 'is_owned'
  }) 
  isOwned: boolean;

  @Column({
    nullable: true,
    length: 50,
    name: 'image_path',
  })
  imagePath: string;
}


