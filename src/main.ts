import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // Microservice 설정 (RabbitMQ)
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'], // RabbitMQ 서버 URL
  //     queue: 'messages_queue', // 큐 이름
  //     queueOptions: {
  //       durable: false, // 메시지 내구성 여부
  //     },
  //   },
  // });

  // // 마이크로서비스 시작
  // await app.startAllMicroservices();

  // HTTP 서버 시작
  await app.listen(process.env.PORT ?? 3000); // HTTP 서버를 위한 포트
}

bootstrap();
