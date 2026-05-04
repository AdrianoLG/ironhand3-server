import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class Country {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Country name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Country slug' })
  @Prop({ required: true, unique: true })
  slug: string

  @Field(() => String, { description: 'Country flag', nullable: true })
  @Prop()
  flag?: string
}

export type CountryDocument = Country & Document
export const CountrySchema = SchemaFactory.createForClass(Country)
