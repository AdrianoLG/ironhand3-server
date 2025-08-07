import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { CompletedCleaningTasksResolver } from './completed-cleaning-tasks.resolver'
import { CompletedCleaningTasksService } from './completed-cleaning-tasks.service'
import {
  CompletedCleaningTask,
  CompletedCleaningTaskSchema
} from './entities/completed-cleaning-task.entity'

@Module({
  providers: [
    CompletedCleaningTasksResolver,
    CompletedCleaningTasksService,
    ConfigService
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: CompletedCleaningTask.name,
        schema: CompletedCleaningTaskSchema
      }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [CompletedCleaningTasksService]
})
export class CompletedCleaningTasksModule {}
