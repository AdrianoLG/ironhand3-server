import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { CleaningTasksResolver } from './cleaning-tasks.resolver'
import { CleaningTasksService } from './cleaning-tasks.service'
import {
  CleaningTask,
  CleaningTaskSchema
} from './entities/cleaning-task.entity'

@Module({
  providers: [CleaningTasksResolver, CleaningTasksService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: CleaningTask.name, schema: CleaningTaskSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [CleaningTasksService]
})
export class CleaningTasksModule {}
