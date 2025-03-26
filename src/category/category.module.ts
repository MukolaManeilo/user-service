import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategorySeeder } from './seed/category-seeder';
import { CategoryRepository } from './category.repository';

@Module({
	providers: [PrismaService, CategorySeeder, CategoryRepository],
	exports: [CategoryRepository],
})
export class CategoryModule {}
