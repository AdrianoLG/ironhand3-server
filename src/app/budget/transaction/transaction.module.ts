import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { Transaction, TransactionSchema } from './entities/transaction.entity'
import { TransactionResolver } from './transaction.resolver'
import { TransactionService } from './transaction.service'

@Module({
  providers: [TransactionResolver, TransactionService, ConfigService],
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema }
    ]),
    ConfigModule.forRoot({
      cache: true
    })
  ]
})
export class TransactionModule {}
