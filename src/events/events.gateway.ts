import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';

// 5500 socket server
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

  constructor(@Inject('MESSAGE_SERVICE') private client: ClientProxy) {}

  // events.gateway.ts
  @SubscribeMessage('BACKEND.Message')
  // 1. 클라이언트에서 message를 받아온다.
  // 2. 다시 server로 emit 해준다.
  async message(@MessageBody() data: { message: string }) {
    // RabbitMQ Producer (messages_queue)에 전송된다.
    // -> RabbitMQ Consumer (messages_queue)로 받을 수 있다.
    console.log('RabbitMQ Producer: ', data);
    this.client.emit('messages_queue', {
      message: data.message,
    }); //
  }

  async sendMessage(data: any) {
    // RabbitMQ에서 받아와 실시간 유저에게 전송
    console.log('RabbitMQ -> Socket: ', data);
    this.io.server.of('chat').emit('BACKEND.Message', data.message);
  }

  @SubscribeMessage('BACKEND.Report')
  async report(
    @MessageBody() data: { report: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { report } = data;

    this.io.server.of('chat').emit('BACKEND.Report', report);

    client.emit('BACKEND.ReportSuccessMessage', `공지사항이 등록되었습니다.`);
  }
}
