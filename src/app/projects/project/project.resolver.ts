import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../../auth/decorators/current-user.decorator'
import { User } from '../../user/entities/user.entity'
import { CreateProjectInput } from './dto/create-project.input'
import { UpdateProjectInput } from './dto/update-project.input'
import { Project } from './entities/project.entity'
import { ProjectService } from './project.service'

@Resolver(() => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation(() => Project)
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @CurrentUser() currentUser: User
  ) {
    return this.projectService.createProject(createProjectInput, currentUser)
  }

  @Query(() => [Project], { name: 'projects' })
  findAll(@CurrentUser() currentUser: User) {
    return this.projectService.findAllProjects(currentUser)
  }

  @Query(() => Project, { name: 'project' })
  findOne(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.projectService.getProjectById(id, currentUser)
  }

  @Mutation(() => Project)
  updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
    @CurrentUser() currentUser: User
  ) {
    return this.projectService.updateProject(
      updateProjectInput._id,
      updateProjectInput,
      currentUser
    )
  }

  @Mutation(() => Project)
  removeProject(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId,
    @CurrentUser() currentUser: User
  ) {
    return this.projectService.removeProject(id, currentUser)
  }
}
