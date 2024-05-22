/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get } from '@nestjs/common';
import { MailappService } from './mailapp.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class MailappController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly mailappService: MailappService) {}

//   @Get()
//   getHello(): string {
//     return this.mailappService.getHello();
//   }
// }

@EventPattern( 'new_mail' )
 handleNewMail ( data: any ) {
 console.log( 'Este es el evento entrante', data )
 //TODO: Lógica relacionada a la creación de un nuevo mail
 }
}
