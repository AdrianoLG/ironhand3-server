import { IsMongoId } from 'class-validator'
import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType, PartialType } from '@nestjs/graphql'

import { CreateCropContainerInput } from './create-crop-container.input'

@InputType()
export class UpdateCropContainerInput extends PartialType(
  CreateCropContainerInput
) {
  @Field(() => String)
  @IsMongoId()
  _id: MongoSchema.Types.ObjectId
}
