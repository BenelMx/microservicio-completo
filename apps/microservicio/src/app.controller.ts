/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
// eslint-disable-next-line prettier/prettier

@Controller() // Marca esta clase como un controlador
export class AppController {
    getHello(): any {
      throw new Error('Method not implemented.');
    }
    constructor(private readonly _appService: AppService) {
        // Constructor para inyectar AppService
    }

    @Post('examen') // Define un endpoint POST accesible en /new-user
    public async newUser(@Body() body: unknown) {
        // Objeto de usuario falso predeterminado
        const fakeUser = {
            email: 'fake_user@microservice.com',
            name: 'Fake User',
            avatar: 'https://fake-image.com',
            password: 'FakePassword_1234'
        };
    
        // Si el cuerpo de la solicitud está vacío, asigna fakeUser a body
        if (!body || Object.keys(body).length === 0) {
            body = fakeUser;
        }
    
        // Verifica que body es un objeto con las propiedades name y email
        if (typeof body === 'object' && body !== null) {
            const { name, email } = body as { name: string; email: string };
    
            if (typeof name === 'string' && typeof email === 'string') {
                // Llama al método newUser de AppService con el cuerpo modificado
                return this._appService.newUser({ name, email });
            }
        }
    
        // Lanza un error si body no tiene el formato esperado
        throw new Error('El formato de body es inválido o incompleto.');
    }
}