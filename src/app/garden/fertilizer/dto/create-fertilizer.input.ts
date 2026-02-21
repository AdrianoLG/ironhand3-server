import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateFertilizerInput {
  @Field(() => String, { description: 'Fertilizer name' })
  name: string

  @Field(() => String, { description: 'Comments' })
  comments: string

  @Field(() => String, { description: 'Image' })
  img: string
}
