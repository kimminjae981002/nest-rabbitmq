import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  controllers: [MessageController],
  providers: [EventsGateway],
})
export class MessageModule {}
