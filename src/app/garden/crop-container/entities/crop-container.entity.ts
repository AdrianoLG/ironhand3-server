import { Schema as MongoSchema } from 'mongoose'

import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class CropContainer {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Crop container name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Image for the crop container' })
  @Prop({ required: true })
  img: string

  @Field(() => Int, { description: 'Capacity' })
  @Prop({ required: true })
  capacity: number

  @Field(() => Boolean, { description: 'Automatic mode' })
  @Prop({ required: true })
  auto: boolean
}

export type CropContainerDocument = CropContainer & Document
export const CropContainerSchema = SchemaFactory.createForClass(CropContainer)
