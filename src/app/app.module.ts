import { join } from 'path';

import {
    ApolloServerPluginLandingPageLocalDefault
} from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import { GoalModule } from './budget/goal/goal.module';
import { SavingModule } from './budget/saving/saving.module';
import { SubscriptionModule } from './budget/subscription/subscription.module';
import { TransactionModule } from './budget/transaction/transaction.module';
import { BookModule } from './catalog/book/book.module';
import { CountryModule } from './catalog/country/country.module';
import { GenreModule } from './catalog/genre/genre.module';
import { MovieModule } from './catalog/movie/movie.module';
import { PersonModule } from './catalog/person/person.module';
import { SerieModule } from './catalog/serie/serie.module';
import { CleaningTasksModule } from './cleaning/cleaning-tasks/cleaning-tasks.module';
import {
    CompletedCleaningTasksModule
} from './cleaning/completed-cleaning-tasks/completed-cleaning-tasks.module';
import { RoomsModule } from './cleaning/rooms/rooms.module';
import { CompletedExerciseModule } from './exercise/completed-exercise/completed-exercise.module';
import { ExerciseModule } from './exercise/exercise/exercise.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { CropContainerModule } from './garden/crop-container/crop-container.module';
import { CropModule } from './garden/crop/crop.module';
import { FertilizerModule } from './garden/fertilizer/fertilizer.module';
import { PlantModule } from './garden/plant/plant.module';
import { SpecieModule } from './garden/specie/specie.module';
import { WateringModule } from './garden/watering/watering.module';
import { HeaderModule } from './navigation/header/header.module';
import { NotesModule } from './notes/notes.module';
import { CompletedMealModule } from './nutrition/completed-meal/completed-meal.module';
import { FoodModule } from './nutrition/food/food.module';
import { IngredientModule } from './nutrition/ingredient/ingredient.module';
import { RecipeModule } from './nutrition/recipe/recipe.module';
import { ProjectModule } from './projects/project/project.module';
import { TaskModule } from './projects/task/task.module';
import { InstrumentModule } from './rehearsal/instrument/instrument.module';
import { RehearsalModule } from './rehearsal/rehearsal/rehearsal.module';
import { SheetModule } from './rehearsal/sheet/sheet.module';
import { ShortcutCategoryModule } from './settings/shortcut-category/shortcut-category.module';
import { ShortcutsModule } from './settings/shortcut/shortcut.module';
import { UserModule } from './user/user.module';

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
    CountryModule,
    GenreModule,
    PersonModule,
    MovieModule,
    SerieModule,
    ShortcutsModule,
    ShortcutCategoryModule,
    HeaderModule,
    NotesModule,
    CompletedExerciseModule,
    ExerciseModule,
    FileUploadModule,
    CleaningTasksModule,
    CompletedCleaningTasksModule,
    RoomsModule,
    RehearsalModule,
    InstrumentModule,
    SheetModule,
    PlantModule,
    SpecieModule,
    CropModule,
    CropContainerModule,
    WateringModule,
    FertilizerModule,
    CompletedMealModule,
    IngredientModule,
    RecipeModule,
    FoodModule,
    TransactionModule,
    SubscriptionModule,
    SavingModule,
    GoalModule,
    ProjectModule,
    TaskModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
