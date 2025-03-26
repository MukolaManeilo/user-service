import { Module } from '@nestjs/common';
import { RatingRepository } from './rating.repository';

@Module({ providers: [RatingRepository] })
export class RatingModule {}
