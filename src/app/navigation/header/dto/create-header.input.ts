import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateHeaderInput {
  @Field(() => String, { description: 'Title of nav item' })
  title: string

  @Field(() => String, { description: 'URL of nav item' })
  url: string
}
