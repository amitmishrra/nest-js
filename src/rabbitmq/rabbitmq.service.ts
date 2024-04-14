import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private readonly rabbitUrl = process.env.RABBITMQ_URL;

  async sendMessage(queue: string, message: string): Promise<void> {
    const connection = await amqp.connect(this.rabbitUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to ${queue}: ${message}`);
    setTimeout(() => {
      connection.close();
    }, 500);
  }

  async consumeMessage(queue: string, callback: (msg: amqp.ConsumeMessage | null) => void): Promise<void> {
    const connection = await amqp.connect(this.rabbitUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });
    channel.consume(queue, callback, { noAck: true });
  }
}