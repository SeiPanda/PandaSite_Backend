import { Book } from 'src/book/entities/book.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];
}

//   @Column()
//   shortDescription: string;

//   @Column()
//   longDescription: string;

//   @Column()
//   githubLink: string;

//   @Column()
//   projectLiveLink: string;
// }
