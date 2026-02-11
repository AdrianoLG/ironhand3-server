import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Instrument, InstrumentSchema } from './entities/instrument.entity'
import { InstrumentResolver } from './instrument.resolver'
import { InstrumentService } from './instrument.service'

@Module({
  providers: [InstrumentResolver, InstrumentService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Instrument.name, schema: InstrumentSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [InstrumentService]
})
export class InstrumentModule {}
