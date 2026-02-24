import { Field, InputType } from '@nestjs/graphql'

import { PlantDeathCause } from '../entities/plant.entity'

@InputType()
export class PlantDeathInput {
  @Field(() => Date, { description: 'Death date' })
  date: Date

  @Field(() => PlantDeathCause, { description: 'Death cause' })
  cause: PlantDeathCause
}

@InputType()
export class CreatePlantInput {
  @Field(() => String, { description: 'Plant name' })
  name: string

  @Field(() => String, { description: 'Specie ID' })
  specie: string

  @Field(() => Date, { description: 'Planted date' })
  planted: Date

  @Field(() => [Date], { description: 'Bloom dates', nullable: true })
  inBloom?: Date[]

  @Field(() => [Date], { description: 'Harvested dates', nullable: true })
  harvested?: Date[]

  @Field(() => PlantDeathInput, { description: 'Death info', nullable: true })
  death?: PlantDeathInput
}
