import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { UserModule } from './users/users.module';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [MongoModule, UserModule, RabbitMQModule],
})
export class AppModule {}
