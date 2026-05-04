import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Person, PersonSchema } from './entities/person.entity'
import { PersonResolver } from './person.resolver'
import { PersonService } from './person.service'

@Module({
  providers: [PersonResolver, PersonService, ConfigService],
  imports: [
    MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }]),
    ConfigModule.forRoot({
      cache: true
    })
  ],
  exports: [PersonService]
})
export class PersonModule {}
