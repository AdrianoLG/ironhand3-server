import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateInstrumentInput {
  @Field(() => String, { description: 'Instrument name' })
  name: string

  @Field(() => String, { description: 'Slug for the instrument' })
  slug: string

  @Field(() => String, { description: 'Image for the instrument' })
  img: string
}
