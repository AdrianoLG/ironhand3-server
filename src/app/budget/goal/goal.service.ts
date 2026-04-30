import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateGoalInput } from './dto/create-goal.input'
import { UpdateGoalInput } from './dto/update-goal.input'
import { Goal, GoalDocument } from './entities/goal.entity'

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name)
    private goalModel: Model<GoalDocument>
  ) {}

  async createGoal(createGoalInput: CreateGoalInput) {
    const createdGoal = new this.goalModel(createGoalInput)

    return createdGoal.save()
  }

  async findAllGoals() {
    return this.goalModel.find().exec()
  }

  async getGoalById(id: MongooseSchema.Types.ObjectId) {
    return this.goalModel.findById(id).exec()
  }

  async updateGoal(
    id: MongooseSchema.Types.ObjectId,
    updateGoalInput: UpdateGoalInput
  ) {
    return this.goalModel
      .findByIdAndUpdate(id, updateGoalInput, { new: true })
      .exec()
  }

  async removeGoal(id: MongooseSchema.Types.ObjectId) {
    return this.goalModel.findByIdAndDelete(id).exec()
  }
}
