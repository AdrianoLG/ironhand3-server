import { Schema as MongoSchema } from 'mongoose';

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field(() => String, { description: 'Project title' })
  title: string

  @Field(() => String, { description: 'Project description', nullable: true })
  description?: string

  @Field(() => Boolean, {
    description: 'Whether project is shared',
    nullable: true
  })
  shared?: boolean

  @Field(() => String, { description: 'Project category' })
  category: string

  @Field(() => [String], {
    description: 'Task ids for this project',
    nullable: true
  })
  tasks?: MongoSchema.Types.ObjectId[]
}
