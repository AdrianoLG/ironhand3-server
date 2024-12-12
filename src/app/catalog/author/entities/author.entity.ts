import { Schema as MongooSchema } from 'mongoose'

import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Book } from '../../book/entities/book.entity'

@ObjectType()
@Schema()
export class Author {
  @Field(() => String)
  _id: MongooSchema.Types.ObjectId

  @Field(() => String, { description: 'Name of the author' })
  @Prop({ required: true, unique: true })
  first_name?: string

  @Field(() => String, {
    description: 'Last name of the author',
    nullable: true
  })
  @Prop()
  last_name?: string

  @Field(() => String, { description: 'Date of birth', nullable: true })
  @Prop()
  birth_date?: string

  @Field(() => String, { description: 'Date of death', nullable: true })
  @Prop()
  death_date?: string

  @Field(() => String, {
    description: 'Nationality of the author',
    nullable: true
  })
  @Prop()
  nationality?: string

  @Field(() => String, {
    description: 'Notes about the author',
    nullable: true
  })
  @Prop()
  notes?: string

  @Field(() => [Book], {
    description: 'List of authors books',
    nullable: false,
    defaultValue: []
  })
  @Prop({ type: [{ type: MongooSchema.Types.ObjectId, ref: 'Book' }] })
  books: Book[]
}

@ObjectType()
export class GetAuthorsPaginatedResponse {
  @Field(() => [Author], {
    description: 'List of authors',
    nullable: false,
    defaultValue: []
  })
  authorList: Author[]

  @Field(() => Int, {
    description: 'Total of authors',
    nullable: false,
    defaultValue: 0
  })
  authorsCount: number
}

export type AuthorDocument = Author & Document
export const AuthorSchema = SchemaFactory.createForClass(Author)
