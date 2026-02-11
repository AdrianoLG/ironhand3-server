import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateRehearsalInput } from './create-rehearsal.input'

@InputType()
export class UpdateRehearsalInput extends PartialType(CreateRehearsalInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}
