import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global pipes and filters
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors();

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Wash Word API')
    .setDescription('Car wash service management API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('washes')
    .addTag('subscriptions')
    .addTag('rewards')
    .addTag('feedback')
    .addTag('wash-halls')
    .addTag('services')
    .addTag('problems')
    .addTag('locations')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
