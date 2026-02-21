import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateFertilizerInput } from './create-fertilizer.input'

@InputType()
export class UpdateFertilizerInput extends PartialType(CreateFertilizerInput) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}
