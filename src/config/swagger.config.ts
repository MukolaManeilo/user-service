import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('User & Task Service')
    .setDescription('API for managing users and tasks')
    .setVersion('1.0')
    .addTag('users', 'Operations related to users')
    .addTag('tasks', 'Operations related to tasks')
    .addBearerAuth()
    .setExternalDoc('gRPC API Definition', '/grpc')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
