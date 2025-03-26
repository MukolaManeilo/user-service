import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getByName(name: string): Promise<Category | null> {
		return this.prisma.category.findUnique({ where: { name } });
	}

	async getById(id: string): Promise<Category | null> {
		return this.prisma.category.findUnique({ where: { id } });
	}

	async getAll(): Promise<Category[]> {
		return this.prisma.category.findMany();
	}

	async getSubCategories(parentCategoryId: string): Promise<Category[]> {
		return this.prisma.category.findMany({ where: { parentCategoryId } });
	}
}
