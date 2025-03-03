import { Injectable } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';

@Injectable()
export class MessageService {
  @MessagePattern({ cmd: 'messages_queue' })
  async handleChatMessage(
    @Payload() message: { message: string; roomId: string },
    @Ctx() context: RmqContext,
  ) {
    console.log('Received message from RabbitMQ:', message.message);
    // 메시지 처리 후 ACK 보내기
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }

  @MessagePattern({ cmd: 'messages_queue' })
  async accumulate(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }
}
