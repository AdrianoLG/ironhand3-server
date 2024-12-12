import { IsOptional } from 'class-validator'
import { Schema as MongooSchema } from 'mongoose'

import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'Title of the book' })
  title: string

  @Field(() => Int, { description: 'Number of pages', nullable: true })
  @IsOptional()
  pages?: number

  @Field(() => String, { description: 'Cover of the book', nullable: true })
  @IsOptional()
  cover?: string

  @Field(() => String, { description: 'ISBN of the book', nullable: true })
  @IsOptional()
  isbn?: string

  @Field(() => String, { description: 'Notes about the book', nullable: true })
  @IsOptional()
  notes?: string

  @Field(() => [String], {
    description: 'List of authors ids',
    nullable: false,
    defaultValue: []
  })
  authors: MongooSchema.Types.ObjectId[]
}
