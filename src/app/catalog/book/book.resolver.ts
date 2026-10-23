import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { BookService } from './book.service'
import { CreateBookInput } from './dto/create-book.input'
import { UpdateBookInput } from './dto/update-book.input'
import { Book } from './entities/book.entity'

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  createBook(
    @Args('createBookInput') createBookInput: CreateBookInput,
    @CurrentUser() currentUser: User
  ) {
    return this.bookService.createBook(createBookInput, currentUser)
  }

  @Query(() => [Book], { name: 'books' })
  findAll(
    @CurrentUser() currentUser: User,
    @Args('viewUserId', { type: () => String, nullable: true })
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.bookService.findAllBooks(currentUser, viewUserId)
  }

  @Query(() => Book, { name: 'book' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User,
    @Args('viewUserId', { type: () => String, nullable: true })
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.bookService.getBookById(id, currentUser, viewUserId)
  }

  @Mutation(() => Book)
  updateBook(
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
    @CurrentUser() currentUser: User
  ) {
    return this.bookService.updateBook(
      updateBookInput._id,
      updateBookInput,
      currentUser
    )
  }

  @Mutation(() => Book)
  removeBook(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.bookService.removeBook(id, currentUser)
  }
}
