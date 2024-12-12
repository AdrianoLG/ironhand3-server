import { Schema as MongooseSchema } from 'mongoose'
import { GetPaginatedArgs } from 'src/app/common/dto/get-paginated.args'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { AuthorService } from './author.service'
import { CreateAuthorInput } from './dto/create-author.input'
import { UpdateAuthorInput } from './dto/update-author.input'
import { Author, GetAuthorsPaginatedResponse } from './entities/author.entity'

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput
  ) {
    return this.authorService.createAuthor(createAuthorInput)
  }

  @Query(() => GetAuthorsPaginatedResponse, { name: 'authors' })
  findAllAuthors(@Args() args: GetPaginatedArgs) {
    const { limit, skip } = args
    return this.authorService.findAllAuthors(limit, skip)
  }

  @Query(() => Author, { name: 'author' })
  getAuthorById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.authorService.getAuthorById(id)
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput
  ) {
    return this.authorService.updateAuthor(
      updateAuthorInput._id,
      updateAuthorInput
    )
  }

  @Mutation(() => Author)
  removeAuthor(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.authorService.removeAuthor(id)
  }
}
