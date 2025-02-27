import { join } from 'path'

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose'

import { AuthorModule } from './catalog/author/author.module'
import { BookModule } from './catalog/book/book.module'
import { CompletedExerciseModule } from './exercise/completed-exercise/completed-exercise.module'
import { ExerciseModule } from './exercise/exercise/exercise.module'
import { FileUploadModule } from './file-upload/file-upload.module'
import { HeaderModule } from './navigation/header/header.module'
import { ShortcutCategoryModule } from './settings/shortcut-category/shortcut-category.module'
import { ShortcutsModule } from './settings/shortcut/shortcut.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get<string>('DATABASE_URL'),
          dbName: configService.get<string>('DATABASE_NAME')
        }

        return options
      }
    }),
    ConfigModule.forRoot({
      cache: true
    }),
    UserModule,
    BookModule,
    AuthorModule,
    ShortcutsModule,
    ShortcutCategoryModule,
    HeaderModule,
    CompletedExerciseModule,
    ExerciseModule,
    FileUploadModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
