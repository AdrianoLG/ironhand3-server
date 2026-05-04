import { Schema as MongoSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

import { PersonRole } from '../entities/person.entity'

@InputType()
export class CreatePersonInput {
  @Field(() => String, { description: 'Person name' })
  name: string

  @Field(() => String, { description: 'Person last name', nullable: true })
  lastName?: string

  @Field(() => String, { description: 'Person image', nullable: true })
  img?: string

  @Field(() => PersonRole, { description: 'Person role' })
  role: PersonRole

  @Field(() => String, { description: 'Birth country id', nullable: true })
  birthCountry?: MongoSchema.Types.ObjectId
}
