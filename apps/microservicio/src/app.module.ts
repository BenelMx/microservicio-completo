/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Importa la entidad User

@Module({
  imports: [
    // Configura la conexión a la base de datos MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '54321',
      database: 'Taller_4',
      entities: [User],
      synchronize: true,
    }),
    // Configura ClientsModule y registra BM_SERVICE
    ClientsModule.register([
      {
        name: 'BM_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost', // Asegúrate de usar la dirección correcta para el servicio
          port: 3001, // Asegúrate de usar el puerto correcto para el servicio
        },
      },
    ]),
    TypeOrmModule.forFeature([User]), // Importa tu entidad User
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}