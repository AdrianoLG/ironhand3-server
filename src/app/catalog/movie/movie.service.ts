import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateMovieInput } from './dto/create-movie.input'
import { UpdateMovieInput } from './dto/update-movie.input'
import { Movie, MovieDocument } from './entities/movie.entity'

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>
  ) {}

  async createMovie(createMovieInput: CreateMovieInput) {
    const createdMovie = new this.movieModel(createMovieInput)
    return createdMovie.save()
  }

  async findAllMovies() {
    return this.movieModel
      .find()
      .sort({ title: 1 })
      .populate('director')
      .populate('actors')
      .populate('country')
      .populate('genres')
      .exec()
  }

  async getMovieById(id: MongooseSchema.Types.ObjectId) {
    return this.movieModel
      .findById(id)
      .populate('director')
      .populate('actors')
      .populate('country')
      .populate('genres')
      .exec()
  }

  async updateMovie(
    id: MongooseSchema.Types.ObjectId,
    updateMovieInput: UpdateMovieInput
  ) {
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieInput, { new: true })
      .populate('director')
      .populate('actors')
      .populate('country')
      .populate('genres')
      .exec()
  }

  async removeMovie(id: MongooseSchema.Types.ObjectId) {
    return this.movieModel.findByIdAndDelete(id).exec()
  }
}
