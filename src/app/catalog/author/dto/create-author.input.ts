import { IsOptional, MinLength } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'Name of the author' })
  @MinLength(3)
  first_name: string

  @Field(() => String, {
    description: 'Last name of the author',
    nullable: true
  })
  @MinLength(3)
  @IsOptional()
  last_name?: string

  @Field(() => String, { description: 'Date of birth', nullable: true })
  @IsOptional()
  birth_date?: string

  @Field(() => String, { description: 'Date of death', nullable: true })
  @IsOptional()
  death_date?: string

  @Field(() => String, {
    description: 'Nationality of the author',
    nullable: true
  })
  @MinLength(3)
  @IsOptional()
  nationality?: string

  @Field(() => String, {
    description: 'Notes about the author',
    nullable: true
  })
  @MinLength(3)
  @IsOptional()
  notes?: string

  @Field(() => [String], {
    description: 'List of books ids',
    nullable: false,
    defaultValue: []
  })
  books: MongoSchema.Types.ObjectId[]
}
