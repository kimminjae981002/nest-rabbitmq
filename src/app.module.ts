import { Module } from '@nestjs/common';
import { MessageModule } from './rabbitMQ-server/message.module';

@Module({
  imports: [MessageModule],
})
export class AppModule {}
