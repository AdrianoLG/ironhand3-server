import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Note, NoteSchema } from './entities/note.entity';
import { NotesResolver } from './notes.resolver';
import { NotesService } from './notes.service';

@Module({
  providers: [NotesResolver, NotesService],
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])
  ],
  exports: [NotesService]
})
export class NotesModule {}
