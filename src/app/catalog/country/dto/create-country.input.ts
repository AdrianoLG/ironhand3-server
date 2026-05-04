import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCountryInput {
  @Field(() => String, { description: 'Country name' })
  name: string

  @Field(() => String, { description: 'Country slug' })
  slug: string

  @Field(() => String, { description: 'Country flag', nullable: true })
  flag?: string
}
