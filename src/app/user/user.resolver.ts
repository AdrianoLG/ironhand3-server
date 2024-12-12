import { Schema as MongooseSchema } from 'mongoose'

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput)
  }

  @Query(() => [User], { name: 'users' })
  findAllUsers() {
    return this.userService.findAllUsers()
  }

  @Query(() => User, { name: 'user' })
  getUserById(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.userService.getUserById(id)
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput._id, updateUserInput)
  }

  @Mutation(() => User)
  removeUser(
    @Args('id', { type: () => String }) id: MongooseSchema.Types.ObjectId
  ) {
    return this.userService.removeUser(id)
  }
}
