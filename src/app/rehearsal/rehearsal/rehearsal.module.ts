import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Rehearsal, RehearsalSchema } from './entities/rehearsal.entity'
import { RehearsalResolver } from './rehearsal.resolver'
import { RehearsalService } from './rehearsal.service'

@Module({
  providers: [RehearsalResolver, RehearsalService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Rehearsal.name, schema: RehearsalSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [RehearsalService]
})
export class RehearsalModule {}
