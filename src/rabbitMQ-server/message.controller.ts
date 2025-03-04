import { EventsGateway } from './../events/events.gateway';
import { Controller } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';

@Controller('message')
export class MessageController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  // 큐에 ready 상태에서 벗어나 consumer 된다.
  @MessagePattern('messages_queue')
  async consumerRabbitMQ(data: any) {
    console.log('RabbitMQ Consumer: ', data);

    // RabbitMQ에서 받아와 실시간 전송
    await this.eventsGateway.sendMessage(data);

    // 반환을 해줘야한다.
    return { success: true };
  }
}
