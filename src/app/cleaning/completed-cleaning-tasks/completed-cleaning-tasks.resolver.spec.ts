import { Test, TestingModule } from '@nestjs/testing'

import { CompletedCleaningTasksResolver } from './completed-cleaning-tasks.resolver'
import { CompletedCleaningTasksService } from './completed-cleaning-tasks.service'

describe('CompletedCleaningTasksResolver', () => {
  let resolver: CompletedCleaningTasksResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedCleaningTasksResolver, CompletedCleaningTasksService]
    }).compile()

    resolver = module.get<CompletedCleaningTasksResolver>(
      CompletedCleaningTasksResolver
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
