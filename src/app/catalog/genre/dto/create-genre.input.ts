import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateGenreInput {
  @Field(() => String, { description: 'Genre name' })
  name: string

  @Field(() => String, { description: 'Genre slug' })
  slug: string
}
