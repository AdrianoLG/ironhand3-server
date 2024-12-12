import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { Book, BookSchema } from '../book/entities/book.entity'
import { AuthorResolver } from './author.resolver'
import { AuthorService } from './author.service'
import { Author, AuthorSchema } from './entities/author.entity'

@Module({
  providers: [AuthorResolver, AuthorService],
  imports: [
    MongooseModule.forFeature([
      { name: Author.name, schema: AuthorSchema },
      { name: Book.name, schema: BookSchema }
    ])
  ],
  exports: [AuthorService]
})
export class AuthorModule {}
