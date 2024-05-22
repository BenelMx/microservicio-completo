/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailappService {
  getHello(): string {
    return 'Hola soy el microservicio mail';
  }
}
