import { Schema as MongooSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateShortcutCategoryInput {
  @Field(() => String, { description: 'Title of the category' })
  title: string

  @Field(() => [String], {
    description: 'List of shortcuts ids',
    nullable: false,
    defaultValue: []
  })
  shortcuts: MongooSchema.Types.ObjectId[]
}
