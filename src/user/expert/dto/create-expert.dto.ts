import { IsArray, IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateExpertDto {
	@IsString()
	@IsNotEmpty()
	readonly firstName: string;

	@IsString()
	@IsNotEmpty()
	readonly lastName: string;

	@IsEmail()
	@IsNotEmpty()
	readonly email: string;

	@IsString()
	@IsNotEmpty()
	readonly password: string;

	@IsEnum(UserRole)
	readonly userRole: UserRole;

	@IsBoolean()
	@IsOptional()
	readonly mentoring: boolean;

	@IsArray()
	@IsOptional()
	readonly skills?: string[];
}
