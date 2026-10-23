import { Model, Schema as MongooseSchema } from 'mongoose'

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { assertOwnerUnlessShared } from '../../common/utils/assert-owner.util'
import { User } from '../../user/entities/user.entity'
import { Task, TaskDocument } from '../task/entities/task.entity'
import { CreateProjectInput } from './dto/create-project.input'
import { UpdateProjectInput } from './dto/update-project.input'
import { Project, ProjectDocument } from './entities/project.entity'

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>
  ) {}

  async createProject(createProjectInput: CreateProjectInput, owner: User) {
    const createdProject = new this.projectModel({
      ...createProjectInput,
      owner: owner._id
    })
    await createdProject.save()
    return createdProject.populate('owner')
  }

  async findAllProjects(currentUser: User) {
    return this.projectModel
      .find({ $or: [{ owner: currentUser._id }, { shared: true }] })
      .populate('tasks')
      .populate('owner')
      .exec()
  }

  async getProjectById(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const project = await this.projectModel.findById(id).exec()
    if (!project) return null
    assertOwnerUnlessShared(project, currentUser)
    return project.populate(['tasks', 'owner'])
  }

  async updateProject(
    id: MongooseSchema.Types.ObjectId,
    updateProjectInput: UpdateProjectInput,
    currentUser: User
  ) {
    const project = await this.projectModel.findById(id).exec()
    if (!project) return null
    assertOwnerUnlessShared(project, currentUser)
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectInput, { new: true })
      .populate('tasks')
      .populate('owner')
      .exec()
  }

  async removeProject(id: MongooseSchema.Types.ObjectId, currentUser: User) {
    const project = await this.projectModel.findById(id).exec()
    if (!project) return null
    assertOwnerUnlessShared(project, currentUser)

    const removedProject = await this.projectModel.findByIdAndDelete(id).exec()

    if (removedProject) {
      await this.taskModel.deleteMany({ project: id }).exec()
    }

    return removedProject
  }
}
