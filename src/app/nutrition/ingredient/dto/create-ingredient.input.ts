import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateIngredientInput {
  @Field(() => String, { description: 'Ingredient name' })
  name: string

  @Field(() => String, { description: 'Ingredient image' })
  image: string

  @Field(() => Number, { description: 'Quantity', nullable: true })
  qty?: number

  @Field(() => String, { description: 'Unit', nullable: true })
  unit?: string
}
