import { Book } from 'src/book/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  prename: string;

  @Column({
    length: 50,
  })
  surname: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
