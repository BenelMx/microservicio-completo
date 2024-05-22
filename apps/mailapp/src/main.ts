/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MailappModule } from './mailapp.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailappModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
