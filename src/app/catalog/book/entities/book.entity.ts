import { Schema as MongoSchema } from 'mongoose'

import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Author } from '../../author/entities/author.entity'

@ObjectType()
@Schema()
export class Book {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Title of the book' })
  @Prop({ required: true, unique: true })
  title: string

  @Field(() => Int, { description: 'Number of pages', nullable: true })
  @Prop()
  pages?: number

  @Field(() => String, { description: 'Cover of the book', nullable: true })
  @Prop()
  cover?: string

  @Field(() => String, { description: 'Notes about the book', nullable: true })
  @Prop()
  notes?: string

  @Field(() => [Author], {
    description: 'Authors of the book',
    nullable: false,
    defaultValue: []
  })
  @Prop({ type: [{ type: MongoSchema.Types.ObjectId, ref: 'Author' }] })
  authors: Author[]
}

@ObjectType()
export class GetBooksPaginatedResponse {
  @Field(() => [Book], {
    description: 'List of books',
    nullable: false,
    defaultValue: []
  })
  bookList: Book[]

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  booksCount: number
}

export type BookDocument = Book & Document
export const BookSchema = SchemaFactory.createForClass(Book)
