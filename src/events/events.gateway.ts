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

  constructor() {}
  @SubscribeMessage('BACKEND.Message')
  async message(
    @MessageBody() data: { message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(data.message);
    this.io.server.of('chat').emit('BACKEND.Message', data.message);
  }
}
