import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Goal, GoalSchema } from './entities/goal.entity'
import { GoalResolver } from './goal.resolver'
import { GoalService } from './goal.service'

@Module({
  providers: [GoalResolver, GoalService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ]
})
export class GoalModule {}
