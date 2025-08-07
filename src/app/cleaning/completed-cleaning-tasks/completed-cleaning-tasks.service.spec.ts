import { Test, TestingModule } from '@nestjs/testing'

import { CompletedCleaningTasksService } from './completed-cleaning-tasks.service'

describe('CompletedCleaningTasksService', () => {
  let service: CompletedCleaningTasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompletedCleaningTasksService]
    }).compile()

    service = module.get<CompletedCleaningTasksService>(
      CompletedCleaningTasksService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
