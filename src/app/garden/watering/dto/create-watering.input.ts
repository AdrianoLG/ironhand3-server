import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class WateringFertilizerInput {
  @Field(() => Int, { description: 'Quantity' })
  qty: number

  @Field(() => String, { description: 'Fertilizer ID' })
  fertilizer: string
}

@InputType()
export class CreateWateringInput {
  @Field(() => Date, { description: 'Watering date' })
  date: Date

  @Field(() => Int, { description: 'Water amount' })
  water: number

  @Field(() => [WateringFertilizerInput], { description: 'Fertilizers used' })
  fertilizers: WateringFertilizerInput[]
}
