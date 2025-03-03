import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessagesModule } from './messages/messages.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [MessagesModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
