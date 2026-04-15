import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class Ingredient {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Ingredient name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Ingredient image' })
  @Prop({ required: true })
  image: string

  @Field(() => Number, { description: 'Quantity', nullable: true })
  @Prop()
  qty?: number

  @Field(() => String, { description: 'Unit', nullable: true })
  @Prop()
  unit?: string
}

export type IngredientDocument = Ingredient & Document
export const IngredientSchema = SchemaFactory.createForClass(Ingredient)
