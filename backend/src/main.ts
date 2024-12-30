import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS'u etkinleştir
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend'in bulunduğu URL
    methods: 'GET,POST,PUT,DELETE',  // İzin verilen HTTP yöntemleri
    allowedHeaders: 'Content-Type, Authorization',  // İzin verilen başlıklar
  });

  // Swagger yapılandırması
  const config = new DocumentBuilder()
    .setTitle('SOL Transaction API')
    .setDescription('API for transferring SOL tokens')
    .setVersion('1.0')
    .addTag('Transaction')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
