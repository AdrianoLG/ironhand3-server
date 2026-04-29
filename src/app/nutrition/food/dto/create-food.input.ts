import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateFoodInput {
  @Field(() => String, { description: 'Food name' })
  name: string

  @Field(() => Number, { description: 'Kcal', nullable: true })
  kcal?: number

  @Field(() => Number, { description: 'Fats', nullable: true })
  fats?: number

  @Field(() => Number, { description: 'Carbs', nullable: true })
  carbs?: number

  @Field(() => Number, { description: 'Proteins', nullable: true })
  proteins?: number
}
