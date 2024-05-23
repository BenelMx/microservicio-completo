/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Product } from './product.entity';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly _appService: AppService) {}

  @Post('examen')
  public async newUser(@Body() body: unknown) {
    const fakeUser = {
      email: 'fake_user@microservice.com',
      name: 'Fake User',
      avatar: 'https://fake-image.com',
      password: 'FakePassword_1234'
    };
  
    if (!body || Object.keys(body).length === 0) {
      body = fakeUser;
    }
  
    if (typeof body === 'object' && body !== null) {
      const { name, email } = body as { name: string; email: string };
  
      if (typeof name === 'string' && typeof email === 'string') {
        return this._appService.newUser({ name, email });
      }
    }
  
    throw new Error('El formato de body es inválido o incompleto.');
  }

  @Post('products')
  public async newProduct(@Body() body: { name: string, price: number, amount: number }) {
    return this._appService.newProduct(body);
  }

  @Get('products')
  public async findAllProducts() {
    return this._appService.findAllProducts();
  }

  @Get('products/:id')
  public async findOneProduct(@Param('id') id: number) {
    return this._appService.findOneProduct(id);
  }

  @Delete('products/:id')
  public async removeProduct(@Param('id') id: number) {
    return this._appService.removeProduct(id);
  }
}
