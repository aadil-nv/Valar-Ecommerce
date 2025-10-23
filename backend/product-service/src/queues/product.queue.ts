import amqp from "amqplib";
import { config } from "../config/env.config";

let channel: amqp.Channel;
const QUEUE_NAME = "products";

export const connectQueue = async () => {
  const connection = await amqp.connect(config.RABBITMQ_URI);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  console.log( `Product Service RabbitMQ connected`.bgRed.white);
};

export const publishProductEvent = async (event: string, data: any) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify({ event, data })), { persistent: true });
};

export const consumeProductEvents = async (callback: (msg: any) => void) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  await channel.consume(QUEUE_NAME, (msg :any) => {
    if (msg) {
      callback(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    }
  });
};
