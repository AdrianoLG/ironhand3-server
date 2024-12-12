import { Schema as MongooseSchema } from 'mongoose'
import { GetPaginatedArgs } from 'src/app/common/dto/get-paginated.args'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { BookService } from './book.service'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { Book, GetBooksPaginatedResponse } from './entities/book.entity'

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.createBook(createBookInput)
  }

  @Query(() => GetBooksPaginatedResponse, { name: 'books' })
  findAllBooks(@Args() args: GetPaginatedArgs) {
    const { limit, skip } = args
    return this.bookService.findAllBooks(limit, skip)
  }

  @Query(() => Book, { name: 'book' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.bookService.getBookById(id)
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.updateBook(updateBookInput._id, updateBookInput)
  }

  @Mutation(() => Book)
  removeBook(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.bookService.removeBook(id)
  }
}
