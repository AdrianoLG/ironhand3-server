import { Document, Schema as MongoSchema } from 'mongoose'

import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongoSchema.Types.ObjectId

  @Field(() => String, { description: 'Email of the user' })
  @Prop({ required: true, unique: true })
  email: string

  @Field(() => String, { description: 'Password of the user' })
  @Prop({ required: true })
  password: string

  @Field(() => String, { description: 'Name of the user', nullable: true })
  @Prop()
  name?: string

  @Field(() => String, { description: 'City of the user', nullable: true })
  @Prop()
  city?: string

  // TODO Add relationship to the book model
}

export type UserDocument = User & Document
export const UserSchema = SchemaFactory.createForClass(User)
