import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Project, ProjectSchema } from '../project/entities/project.entity';
import { Task, TaskSchema } from './entities/task.entity';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  providers: [TaskResolver, TaskService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Project.name, schema: ProjectSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [TaskService]
})
export class TaskModule {}
