import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Saving, SavingSchema } from './entities/saving.entity'
import { SavingResolver } from './saving.resolver'
import { SavingService } from './saving.service'

@Module({
  providers: [SavingResolver, SavingService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Saving.name, schema: SavingSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ]
})
export class SavingModule {}
