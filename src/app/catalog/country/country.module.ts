import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { CountryResolver } from './country.resolver'
import { CountryService } from './country.service'
import { Country, CountrySchema } from './entities/country.entity'

@Module({
  providers: [CountryResolver, CountryService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [CountryService]
})
export class CountryModule {}
