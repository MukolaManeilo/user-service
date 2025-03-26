import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger.config';

async function start() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('port', 3000);
	setupSwagger(app);

	await app.listen(port).then(() => console.log(`Server is running! Port:${port}`));
}

start().then(() => {});
