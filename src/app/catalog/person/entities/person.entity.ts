import { Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Country } from '../../country/entities/country.entity'

export enum PersonRole {
  DIRECTOR = 'director',
  ACTOR = 'actor',
  WRITER = 'writer'
}

registerEnumType(PersonRole, {
  name: 'PersonRole'
})

@ObjectType()
@Schema()
export class Person {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Person name' })
  @Prop({ required: true })
  name: string

  @Field(() => String, { description: 'Person last name', nullable: true })
  @Prop()
  lastName?: string

  @Field(() => String, { description: 'Person image', nullable: true })
  @Prop()
  img?: string

  @Field(() => PersonRole, { description: 'Person role' })
  @Prop({ required: true, enum: PersonRole })
  role: PersonRole

  @Field(() => Country, {
    description: 'Birth country',
    nullable: true
  })
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Country' })
  birthCountry?: Country
}

export type PersonDocument = Person & Document
export const PersonSchema = SchemaFactory.createForClass(Person)
