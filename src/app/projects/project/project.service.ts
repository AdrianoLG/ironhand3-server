import { Model, Schema as MongooseSchema } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Task, TaskDocument } from '../task/entities/task.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project, ProjectDocument } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private projectModel: Model<ProjectDocument>,
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>
  ) {}

  async createProject(createProjectInput: CreateProjectInput) {
    const createdProject = new this.projectModel(createProjectInput)
    return createdProject.save()
  }

  async findAllProjects() {
    return this.projectModel.find().populate('tasks').exec()
  }

  async getProjectById(id: MongooseSchema.Types.ObjectId) {
    return this.projectModel.findById(id).populate('tasks').exec()
  }

  async updateProject(
    id: MongooseSchema.Types.ObjectId,
    updateProjectInput: UpdateProjectInput
  ) {
    return this.projectModel
      .findByIdAndUpdate(id, updateProjectInput, { new: true })
      .populate('tasks')
      .exec()
  }

  async removeProject(id: MongooseSchema.Types.ObjectId) {
    const removedProject = await this.projectModel.findByIdAndDelete(id).exec()

    if (removedProject) {
      await this.taskModel.deleteMany({ project: id }).exec()
    }

    return removedProject
  }
}
