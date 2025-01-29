import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Exercise, ExerciseSchema } from '../exercise/entities/exercise.entity'
import { CompletedExerciseResolver } from './completed-exercise.resolver'
import { CompletedExerciseService } from './completed-exercise.service'
import {
  CompletedExercise,
  CompletedExerciseSchema
} from './entities/completed-exercise.entity'

@Module({
  providers: [
    CompletedExerciseResolver,
    CompletedExerciseService,
    ConfigService
  ],
  imports: [
    MongooseModule.forFeature([
      { name: CompletedExercise.name, schema: CompletedExerciseSchema },
      {
        name: Exercise.name,
        schema: ExerciseSchema
      }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [CompletedExerciseService]
})
export class CompletedExerciseModule {}
