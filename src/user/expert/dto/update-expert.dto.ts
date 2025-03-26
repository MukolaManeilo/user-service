import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateExpertDto {
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  readonly userRole?: UserRole;

  @IsBoolean()
  @IsOptional()
  readonly mentoring?: boolean;

  @IsArray()
  @IsOptional()
  readonly skills?: string[];
}
