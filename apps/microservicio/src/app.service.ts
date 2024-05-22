/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('BM_SERVICE') private readonly _mailClient: ClientProxy,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async newUser(body: { name: string; email: string }) {
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await this.userRepository.findOne({ where: { email: body.email } });

    // Si existe un usuario con el mismo correo electrónico, devolver un mensaje indicando que ya existe
    if (existingUser) {
      throw new Error('El usuario ya existe en la base de datos.');
    }

    // Insertar el usuario en la base de datos
    const newUser = this.userRepository.create(body);
    const savedUser = await this.userRepository.save(newUser);

    // Emitir el evento "new_email" al servicio
    this._mailClient.emit('new_email', savedUser);

    return savedUser;
  }
}