import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventsGateway } from './events/events.gateway';
import { MessageModule } from './message/message.module';
import { MessageService } from './message/message.service';

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
    MessageModule,
  ],
  providers: [EventsGateway, MessageService],
})
export class AppModule {}
