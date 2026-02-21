import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { CropContainer } from '../../crop-container/entities/crop-container.entity'
import { Plant } from '../../plant/entities/plant.entity'

@ObjectType()
@Schema()
export class Crop {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => Date, { description: 'Start date' })
  @Prop({ required: true })
  startDate: Date

  @Field(() => Date, { description: 'End date' })
  @Prop()
  endDate: Date

  @Field(() => [Plant], { description: 'Plants' })
  @Prop({
    type: [{ type: MongoSchema.Types.ObjectId, ref: 'Plant' }],
    required: true
  })
  plants: (Plant | MongoSchema.Types.ObjectId)[]

  @Field(() => [String], { description: 'Gallery' })
  @Prop({ type: [String], default: [] })
  gallery: string[]

  @Field(() => CropContainer, { description: 'Crop container' })
  @Prop({
    type: MongoSchema.Types.ObjectId,
    ref: 'CropContainer',
    required: true
  })
  cropContainer: CropContainer | MongoSchema.Types.ObjectId
}

export type CropDocument = Crop & Document
export const CropSchema = SchemaFactory.createForClass(Crop)
