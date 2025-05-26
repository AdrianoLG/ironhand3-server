import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import {
  CompletedExercise,
  CompletedExerciseSchema
} from '../completed-exercise/entities/completed-exercise.entity'
import { Exercise, ExerciseSchema } from './entities/exercise.entity'
import { ExerciseResolver } from './exercise.resolver'
import { ExerciseService } from './exercise.service'

@Module({
  providers: [ExerciseResolver, ExerciseService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
      { name: CompletedExercise.name, schema: CompletedExerciseSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [ExerciseService]
})
export class ExerciseModule {}
