import { Schema as MongoSchema } from 'mongoose'

import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Fertilizer } from '../../fertilizer/entities/fertilizer.entity'

@ObjectType()
@Schema({ _id: false })
export class WateringFertilizer {
  @Field(() => Int, { description: 'Quantity' })
  @Prop({ required: true })
  qty: number

  @Field(() => Fertilizer, { description: 'Fertilizer' })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Fertilizer', required: true })
  fertilizer: Fertilizer | MongoSchema.Types.ObjectId
}

export const WateringFertilizerSchema =
  SchemaFactory.createForClass(WateringFertilizer)

@ObjectType()
@Schema()
export class Watering {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => Date, { description: 'Watering date' })
  @Prop({ required: true })
  date: Date

  @Field(() => Int, { description: 'Water amount' })
  @Prop({ required: true })
  water: number

  @Field(() => [WateringFertilizer], { description: 'Fertilizers used' })
  @Prop({
    type: [WateringFertilizerSchema],
    default: []
  })
  fertilizers: WateringFertilizer[]
}

export type WateringDocument = Watering & Document
export const WateringSchema = SchemaFactory.createForClass(Watering)
