import { Module } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { ExpertRepository } from './expert.repository';

@Module({
  providers: [ExpertService, ExpertRepository],
})
export class ExpertModule {}
