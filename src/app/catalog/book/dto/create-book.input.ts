import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, Int } from '@nestjs/graphql'

import { BookFormat, CoverMaterial } from '../entities/book.entity'

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'Book title' })
  title: string

  @Field(() => [String], { description: 'Book authors ids' })
  author: MongoSchema.Types.ObjectId[]

  @Field(() => String, { description: 'Book cover' })
  cover: string

  @Field(() => BookFormat, { description: 'Book format' })
  format: BookFormat

  @Field(() => Int, { description: 'Book pages' })
  pages: number

  @Field(() => CoverMaterial, {
    description: 'Book cover material',
    nullable: true
  })
  coverMaterial?: CoverMaterial

  @Field(() => String, { description: 'Book editorial', nullable: true })
  editorial?: string

  @Field(() => Int, { description: 'Published year', nullable: true })
  publishedYear?: number

  @Field(() => String, { description: 'Synopsis', nullable: true })
  synopsis?: string

  @Field(() => [String], { description: 'Genre ids', nullable: true })
  genres?: MongoSchema.Types.ObjectId[]

  @Field(() => [String], { description: 'Book tags', nullable: true })
  tags?: string[]
}
