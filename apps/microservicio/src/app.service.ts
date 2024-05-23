/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('BM_SERVICE') private readonly _mailClient: ClientProxy,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async newUser(body: { name: string; email: string }) {
    const existingUser = await this.userRepository.findOne({ where: { email: body.email } });
    if (existingUser) {
      throw new Error('El usuario ya existe en la base de datos.');
    }
    const newUser = this.userRepository.create(body);
    const savedUser = await this.userRepository.save(newUser);
    this._mailClient.emit('new_email', savedUser);
    return savedUser;
  }

  async newProduct(body: { name: string, price: number, amount: number }) {
    const newProduct = this.productRepository.create(body);
    return await this.productRepository.save(newProduct);
  }

  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOneProduct(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async removeProduct(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
