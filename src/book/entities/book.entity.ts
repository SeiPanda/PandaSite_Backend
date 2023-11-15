import { Author } from 'src/author/entities/author.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    name: 'short_title',
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
  })
  quote: string;

  @Column({
    length: 50,
    name: 'sub_title',
  })
  subTitle: string;

  @Column()
  band: number;

  @Column({
    length: 80,
    name: 'book_series_title',
  })
  bookSeriesTitle: string;

  @ManyToOne(() => Publisher, (publisher) => publisher.books)
  publisher: Publisher;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

 @Column() 
 isReadingFinished: boolean;

 @Column() 
 isCurrentRead: boolean;

 @Column() 
 isOwned: boolean;
}
