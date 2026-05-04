import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateGenreInput } from './dto/create-genre.input'
import { UpdateGenreInput } from './dto/update-genre.input'
import { Genre, GenreDocument } from './entities/genre.entity'

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre.name)
    private genreModel: Model<GenreDocument>
  ) {}

  async createGenre(createGenreInput: CreateGenreInput) {
    const createdGenre = new this.genreModel(createGenreInput)
    return createdGenre.save()
  }

  async findAllGenres() {
    return this.genreModel.find().sort({ name: 1 }).exec()
  }

  async getGenreById(id: MongooseSchema.Types.ObjectId) {
    return this.genreModel.findById(id).exec()
  }

  async updateGenre(
    id: MongooseSchema.Types.ObjectId,
    updateGenreInput: UpdateGenreInput
  ) {
    return this.genreModel
      .findByIdAndUpdate(id, updateGenreInput, { new: true })
      .exec()
  }

  async removeGenre(id: MongooseSchema.Types.ObjectId) {
    return this.genreModel.findByIdAndDelete(id).exec()
  }
}
