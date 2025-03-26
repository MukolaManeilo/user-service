import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category, Expert, ExpertCategory } from '@prisma/client';

@Injectable()
export class ExpertCategoryRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(expertCategoryData: {
		expertId: string;
		categoryId: string;
		relevance: number;
	}): Promise<ExpertCategory> {
		return this.prisma.expertCategory.create({
			data: expertCategoryData,
		});
	}

	async getCategoriesByExpert(expertId: string): Promise<Category[]> {
		const expertCategories = await this.prisma.expertCategory.findMany({
			where: { expertId },
			include: { category: true },
		});
		return expertCategories.map((ec) => ec.category);
	}

	async getExpertsByCategory(categoryId: string): Promise<Expert[]> {
		const expertCategories = await this.prisma.expertCategory.findMany({
			where: { categoryId },
			include: { expert: true },
		});
		return expertCategories.map((ec) => ec.expert);
	}
}
