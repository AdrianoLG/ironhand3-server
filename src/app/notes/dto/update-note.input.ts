import { IsMongoId, MaxLength } from 'class-validator';
import { Schema as MongoSchema } from 'mongoose';

import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateNoteInput } from './create-note.input';

@InputType()
export class UpdateNoteInput extends PartialType(CreateNoteInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { nullable: true })
  @MaxLength(50)
  title?: string

  @Field(() => String, { nullable: true })
  content?: string

  @Field(() => [String], { nullable: true })
  tags?: string[]

  @Field(() => String, { nullable: true })
  @MaxLength(50)
  category?: string

  @Field(() => [String], { nullable: true })
  images?: string[]
}
