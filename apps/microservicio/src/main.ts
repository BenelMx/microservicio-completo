/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para tu aplicación
  // Puedes personalizar las opciones de CORS si es necesario
  app.enableCors({
    origin: true, // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});

  // Iniciar la aplicación en el puerto 3001
  await app.listen(3001);
}

bootstrap();