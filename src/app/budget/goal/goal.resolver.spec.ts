import { Test, TestingModule } from '@nestjs/testing'

import { GoalResolver } from './goal.resolver'
import { GoalService } from './goal.service'

describe('GoalResolver', () => {
  let resolver: GoalResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoalResolver, GoalService]
    }).compile()

    resolver = module.get<GoalResolver>(GoalResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
