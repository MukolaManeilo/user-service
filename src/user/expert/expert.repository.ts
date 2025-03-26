import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Expert, Prisma } from '@prisma/client';

/**
 * Type representing an identifier for an Expert.
 *
 * This type can either be an object with an `id` field and no `email` field,
 * or an object with an `email` field and no `id` field.
 */
type ExpertIdentifier = { id: string; email?: never } | { email: string; id?: never };

@Injectable()
export class ExpertRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: Prisma.ExpertCreateInput): Promise<Expert> {
		return this.prisma.expert.create({ data });
	}

	async find(identifier: ExpertIdentifier): Promise<Expert | null> {
		return this.prisma.expert.findUnique({
			where: identifier.id ? { id: identifier.id } : { email: identifier.email },
		});
	}

	async update(identifier: ExpertIdentifier, data: Prisma.ExpertUpdateInput): Promise<Expert> {
		return this.prisma.expert.update({
			where: identifier.id ? { id: identifier.id } : { email: identifier.email },
			data,
		});
	}

	async delete(identifier: ExpertIdentifier): Promise<Expert> {
		return this.prisma.expert.delete({
			where: identifier.id ? { id: identifier.id } : { email: identifier.email },
		});
	}
}
