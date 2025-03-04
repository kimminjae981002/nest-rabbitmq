import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'], // RabbitMQ 서버 URL
          queue: 'messages_queue', // 큐 이름
          queueOptions: {
            durable: false, // 메시지 내구성 여부
          },
        },
      },
    ]),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
