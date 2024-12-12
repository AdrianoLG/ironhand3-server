import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Author, AuthorSchema } from '../author/entities/author.entity'
import { BookResolver } from './book.resolver'
import { BookService } from './book.service'
import { Book, BookSchema } from './entities/book.entity'

@Module({
  providers: [BookResolver, BookService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Author.name, schema: AuthorSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [BookService]
})
export class BookModule {}
