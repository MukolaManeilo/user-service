import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Rating } from '@prisma/client';

@Injectable()
export class RatingRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.RatingCreateInput): Promise<Rating> {
		return this.prisma.rating.create({ data });
	}

	async findById(id: string): Promise<Rating | null> {
		return this.prisma.rating.findUnique({ where: { id } });
	}

	async update(id: string, data: Prisma.RatingUpdateInput): Promise<Rating> {
		return this.prisma.rating.update({ where: { id }, data });
	}

	async delete(id: string): Promise<Rating> {
		return this.prisma.rating.delete({ where: { id } });
	}
}
