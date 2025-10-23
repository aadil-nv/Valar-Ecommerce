import amqp, { ConsumeMessage } from "amqplib";
import { config } from "../config/env.config";

let channel: amqp.Channel;
const QUEUE_NAME = "orders";

export interface OrderEventData {
  orderId: string;
  customerId: string;
  total: number;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  status: string;
  createdAt: string;
}

// Define the shape of a message sent to the queue
export interface OrderEventMessage {
  event: string;
  data: OrderEventData;
}

export const connectOrderQueue = async () => {
  const connection = await amqp.connect(config.RABBITMQ_URI);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });
  console.log(`Order Queue connected`.bgGreen.white);
};

export const consumeOrderEvents = async (
  callback: (msg: OrderEventMessage) => Promise<void> | void
) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");

  await channel.consume(QUEUE_NAME, (msg: ConsumeMessage | null) => {
    if (msg) {
      const parsed: OrderEventMessage = JSON.parse(msg.content.toString());
      callback(parsed); // ✅ Pass the full message with event + data
      channel.ack(msg);
    }
  });
};
