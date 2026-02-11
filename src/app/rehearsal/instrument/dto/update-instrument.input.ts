import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateInstrumentInput } from './create-instrument.input'

@InputType()
export class UpdateInstrumentInput extends PartialType(CreateInstrumentInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}
