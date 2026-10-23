import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwner } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { CreateGoalInput } from './dto/create-goal.input'
import { UpdateGoalInput } from './dto/update-goal.input'
import { Goal, GoalDocument } from './entities/goal.entity'

@Injectable()
export class GoalService {
  constructor(
    @InjectModel(Goal.name)
    private goalModel: Model<GoalDocument>
  ) {}

  async createGoal(createGoalInput: CreateGoalInput, owner: User) {
    const createdGoal = new this.goalModel({
      ...createGoalInput,
      owner: owner._id
    })

    return createdGoal.save()
  }

  async findAllGoals(currentUser: User) {
    return this.goalModel.find({ owner: currentUser._id }).exec()
  }

  async getGoalById(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const goal = await this.goalModel.findById(id).exec()
    if (!goal) return null
    assertOwner(goal.owner, currentUser)
    return goal
  }

  async updateGoal(
    id: MongooseSchema.Types.ObjectId,
    updateGoalInput: UpdateGoalInput,
    currentUser: User
  ) {
    const goal = await this.goalModel.findById(id).exec()
    if (!goal) return null
    assertOwner(goal.owner, currentUser)
    return this.goalModel
      .findByIdAndUpdate(id, updateGoalInput, { new: true })
      .exec()
  }

  async removeGoal(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const goal = await this.goalModel.findById(id).exec()
    if (!goal) return null
    assertOwner(goal.owner, currentUser)
    return this.goalModel.findByIdAndDelete(id).exec()
  }
}
