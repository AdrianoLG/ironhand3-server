import { Field, InputType } from '@nestjs/graphql'

import { SpecieCategory } from '../entities/specie.entity'

@InputType()
export class CreateSpecieInput {
  @Field(() => String, { description: 'Specie name' })
  name: string

  @Field(() => String, { description: 'Specie image' })
  image: string

  @Field(() => SpecieCategory, { description: 'Category' })
  category: SpecieCategory

  @Field(() => String, { description: 'Comments' })
  comments: string
}
