import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateMovieInput } from './dto/create-movie.input'
import { UpdateMovieInput } from './dto/update-movie.input'
import { Movie, MovieDocument } from './entities/movie.entity'

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: Model<MovieDocument>
  ) {}

  async createMovie(createMovieInput: CreateMovieInput, owner: User) {
    const createdMovie = new this.movieModel({
      ...createMovieInput,
      owner: owner._id
    })
    return createdMovie.save()
  }

  async findAllMovies(
    currentUser: User,
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    return this.movieModel
      .find({ owner: viewUserId ?? currentUser._id })
      .sort({ title: 1 })
      .populate({ path: 'director', populate: { path: 'birthCountry' } })
      .populate({ path: 'actors', populate: { path: 'birthCountry' } })
      .populate('country')
      .populate('genres')
      .populate('owner')
      .exec()
  }

  async getMovieById(
    id: MongooseSchema.Types.ObjectId,
    currentUser: User,
    viewUserId?: MongooseSchema.Types.ObjectId
  ) {
    const movie = await this.movieModel.findById(id).exec()
    if (!movie) return null
    const targetOwnerId = viewUserId ?? currentUser._id
    assertOwner(movie.owner, { _id: targetOwnerId } as User)
    return movie.populate([
      { path: 'director', populate: { path: 'birthCountry' } },
      { path: 'actors', populate: { path: 'birthCountry' } },
      'country',
      'genres',
      'owner'
    ])
  }

  async updateMovie(
    id: MongooseSchema.Types.ObjectId,
    updateMovieInput: UpdateMovieInput,
    currentUser: User
  ) {
    const movie = await this.movieModel.findById(id).exec()
    if (!movie) return null
    assertOwner(movie.owner, currentUser)
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieInput, { new: true })
      .populate({ path: 'director', populate: { path: 'birthCountry' } })
      .populate({ path: 'actors', populate: { path: 'birthCountry' } })
      .populate('country')
      .populate('genres')
      .populate('owner')
      .exec()
  }

  async removeMovie(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const movie = await this.movieModel.findById(id).exec()
    if (!movie) return null
    assertOwner(movie.owner, currentUser)
    return this.movieModel.findByIdAndDelete(id).exec()
  }
}
