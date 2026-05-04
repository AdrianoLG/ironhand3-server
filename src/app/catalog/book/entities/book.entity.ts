import { Schema as MongoSchema } from 'mongoose'

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Genre } from '../../genre/entities/genre.entity'
import { Person } from '../../person/entities/person.entity'

export enum BookFormat {
  PAPER = 'paper',
  ELECTRONIC = 'electronic'
}

export enum CoverMaterial {
  SOFT = 'soft',
  HARD = 'hard'
}

registerEnumType(BookFormat, {
  name: 'BookFormat'
})

registerEnumType(CoverMaterial, {
  name: 'CoverMaterial'
})

@ObjectType()
@Schema()
export class Book {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Book title' })
  @Prop({ required: true })
  title: string

  @Field(() => [Person], { description: 'Book authors' })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Person', required: true })
  author: Person[]

  @Field(() => String, { description: 'Book cover' })
  @Prop({ required: true })
  cover: string

  @Field(() => BookFormat, { description: 'Book format' })
  @Prop({ required: true, enum: BookFormat })
  format: BookFormat

  @Field(() => Int, { description: 'Book pages' })
  @Prop({ required: true })
  pages: number

  @Field(() => CoverMaterial, {
    description: 'Book cover material',
    nullable: true
  })
  @Prop({ enum: CoverMaterial })
  coverMaterial?: CoverMaterial

  @Field(() => String, { description: 'Book editorial', nullable: true })
  @Prop()
  editorial?: string

  @Field(() => Int, { description: 'Published year', nullable: true })
  @Prop()
  publishedYear?: number

  @Field(() => String, { description: 'Synopsis', nullable: true })
  @Prop()
  synopsis?: string

  @Field(() => [Genre], { description: 'Book genres', nullable: true })
  @Prop({ type: [MongoSchema.Types.ObjectId], ref: 'Genre' })
  genres?: Genre[]

  @Field(() => [String], { description: 'Book tags', nullable: true })
  @Prop({ type: [String] })
  tags?: string[]
}

export type BookDocument = Book & Document
export const BookSchema = SchemaFactory.createForClass(Book)
