import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../config/app.config';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { RatingModule } from '../user/rating/rating.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appConfig],
		}),
	],
	controllers: [],
	providers: [CategoryModule, UserModule, PrismaModule, RepositoriesModule, RatingModule],
})
export class AppModule {}
