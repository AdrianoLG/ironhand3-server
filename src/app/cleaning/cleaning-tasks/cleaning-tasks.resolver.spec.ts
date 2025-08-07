import { Test, TestingModule } from '@nestjs/testing'

import { CleaningTasksResolver } from './cleaning-tasks.resolver'
import { CleaningTasksService } from './cleaning-tasks.service'

describe('CleaningTasksResolver', () => {
  let resolver: CleaningTasksResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleaningTasksResolver, CleaningTasksService]
    }).compile()

    resolver = module.get<CleaningTasksResolver>(CleaningTasksResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
