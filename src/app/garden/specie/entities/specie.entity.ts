import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export enum SpecieCategory {
  VEGETABLES = 'vegetables',
  FRUITS = 'fruits',
  HERBS = 'herbs',
  MEDICINAL = 'medicinal'
}

registerEnumType(SpecieCategory, {
  name: 'SpecieCategory'
})

@ObjectType()
@Schema()
export class Specie {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Specie name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Specie image', nullable: true })
  @Prop()
  image?: string

  @Field(() => SpecieCategory, { description: 'Category' })
  @Prop({ required: true, enum: Object.values(SpecieCategory) })
  category: SpecieCategory

  @Field(() => String, { description: 'Comments', nullable: true })
  @Prop()
  comments?: string
}

export type SpecieDocument = Specie & Document
export const SpecieSchema = SchemaFactory.createForClass(Specie)
