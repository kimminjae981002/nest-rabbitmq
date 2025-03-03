import { Inject } from '@nestjs/common';
import {
  Client,
  ClientProxy,
  MessagePattern,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
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
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
})
export class EventsGateway {
  constructor(@Inject('MESSAGE_SERVICE') private client: ClientProxy) {}
  @WebSocketServer() io: Namespace;

  @MessagePattern('messages_queue') // 'messages_queue' 이벤트 패턴에 대한 핸들러
  async handleChatMessage(data: { message: string; roomId: string }) {
    console.log('Received message from RabbitMQ:', data.message);
    this.io.server.to(data.roomId).emit('BACKEND.Message', data.message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { roomId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.roomId);
    console.log(`${client.id} has joined room: ${data.roomId}`);
  }

  // events.gateway.ts
  @SubscribeMessage('BACKEND.Message')
  async message(
    @MessageBody() data: { roomId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Message from room ${data.roomId}: ${data.message}`);

    // 큐에 메시지 저장
    await this.client.emit('messages_queue', {
      message: data.message,
      roomId: data.roomId,
    }); // emit 할 때, payload를 메시지에 맞게 전달
    this.io.server
      .of('chat')
      .to(data.roomId)
      .emit('BACKEND.Message', data.message);
  }
}
