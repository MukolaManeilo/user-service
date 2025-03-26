import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import categoryData from './category-data';

@Injectable()
export class CategorySeeder implements OnModuleInit {
	constructor(private readonly prisma: PrismaService) {}

	async onModuleInit() {
		console.log('Running CategorySeeder...');
		await this.seedCategories();
	}

	private async seedCategories() {
		for (const category of categoryData()) {
			await this.createCategory(category);
		}
	}

	private async createCategory(data, parentCategoryId: string | null = null) {
		const existingCategory = await this.prisma.category.findUnique({
			where: { name: data.name },
		});

		if (existingCategory) return;

		const category = await this.prisma.category.create({
			data: {
				name: data.name,
				description: data.description,
				tags: data.tags,
				parentCategoryId,
			},
		});

		if (data.subCategories) {
			for (const subCategory of data.subCategories) {
				await this.createCategory(subCategory, category.id);
			}
		}
	}
}
