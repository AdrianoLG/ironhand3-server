import { Schema as MongooSchema } from 'mongoose'

import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateShortcutInput {
  @Field(() => String, { description: 'Shortcut title' })
  title: string

  @Field(() => String, { description: 'Shortcut subtitle' })
  subtitle: string

  @Field(() => String, { description: 'Shortcut image' })
  image: string

  @Field(() => String, { description: 'Shortcut category' })
  category: MongooSchema.Types.ObjectId

  @Field(() => String, { description: 'Shortcut action' })
  action: string
}
