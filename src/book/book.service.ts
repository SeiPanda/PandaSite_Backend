import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  getBooks(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: {
        genres: true,
        author: true,
        publisher: true,
      },
    });
  }
}
