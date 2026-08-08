import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Task, TaskSchema } from '../task/entities/task.entity';
import { Project, ProjectSchema } from './entities/project.entity';
import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

@Module({
  providers: [ProjectResolver, ProjectService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Task.name, schema: TaskSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [ProjectService]
})
export class ProjectModule {}
