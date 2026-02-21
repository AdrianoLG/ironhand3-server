import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class Fertilizer {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Fertilizer name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Comments', nullable: true })
  @Prop()
  comments?: string

  @Field(() => String, { description: 'Image' })
  @Prop({ required: true })
  img: string
}

export type FertilizerDocument = Fertilizer & Document
export const FertilizerSchema = SchemaFactory.createForClass(Fertilizer)
