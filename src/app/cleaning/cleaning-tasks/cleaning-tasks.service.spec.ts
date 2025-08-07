import { Test, TestingModule } from '@nestjs/testing'

import { CleaningTasksService } from './cleaning-tasks.service'

describe('CleaningTasksService', () => {
  let service: CleaningTasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleaningTasksService]
    }).compile()

    service = module.get<CleaningTasksService>(CleaningTasksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
