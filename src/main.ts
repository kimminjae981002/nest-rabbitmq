import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // HTTP 서버 설정
  const app = await NestFactory.create(AppModule);

  // Microservice 설정 (RabbitMQ 연결)
  const appMicro = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ 서버 URL
      queue: 'messages_queue', // 사용할 큐 이름
      queueOptions: {
        durable: false, // 큐의 내구성 설정 (기본: false)
      },
    },
  });

  // HTTP 서버 시작
  await app.listen(3000);

  // Microservice 서버 시작
  await appMicro.listen();
}
bootstrap();
