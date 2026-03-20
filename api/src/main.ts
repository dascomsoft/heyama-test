import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*', // Autorise toutes les origines
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  await app.listen(3001, '0.0.0.0'); // Écoute sur toutes les interfaces
  console.log(`🚀 API running on http://0.0.0.0:3001`);
}
bootstrap();