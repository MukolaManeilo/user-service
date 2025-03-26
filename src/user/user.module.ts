import { Module } from '@nestjs/common';
import { ExpertModule } from './expert/expert.module';
import { ClientModule } from './client/client.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [ExpertModule, ClientModule, RatingModule],
  controllers: [],
})
export class UserModule {}
