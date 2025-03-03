import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  namespace: 'chat',
  path: '/socket.io',
  cors: {
    origin: '*', // CORS 설정
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class EventsGateway {
  // socket 서버 실행
  @WebSocketServer()
  io: Namespace;

  @Client({
    transport: Transport.RMQ, // RabbitMQ 사용
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'messages_queue', // 큐 이름
      queueOptions: { durable: false }, // 큐가 지속되지 않도록 설정
    },
  })
  private client: ClientProxy; // RabbitMQ와 연결된 클라이언트

  constructor() {}
  @SubscribeMessage('BACKEND.Message')
  async message(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data.message);
    this.io.server.of('chat').emit('BACKEND.Message', data.message);
  }

  @SubscribeMessage('messages_queue')
  async handleChatMessage(message: string) {
    console.log('Received message from RabbitMQ:', message);
    // WebSocket 클라이언트들에게 메시지를 전송
    this.io.server.of('chat').emit('BACKEND.Message', message);
  }
}
