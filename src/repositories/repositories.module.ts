import { Module } from '@nestjs/common';
import { ExpertCategoryRepository } from './expert-category.repository';

@Module({ imports: [ExpertCategoryRepository], exports: [ExpertCategoryRepository] })
export class RepositoriesModule {}
