import amqp from "amqplib";
import { config } from "../config/env.config";
import { saveAnalyticsEvent } from "../services/analytics.service";
import { broadcastAnalyticsUpdate } from "../websockets/ws.server";

let channel: amqp.Channel;

const QUEUE_NAME = "analytics";

export const connectQueue = async () => {
  const connection = await amqp.connect(config.RABBITMQ_URI);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  console.log(`Analytics Service RabbitMQ connected`.bgRed.white);

  await consumeAnalyticsEvents();
};

export const publishAnalyticsEvent = async (event: any) => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(event)), { persistent: true });
};

const consumeAnalyticsEvents = async () => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");

  await channel.consume(QUEUE_NAME, async (msg) => {
    if (msg) {
      const event = JSON.parse(msg.content.toString());

      // Save to DB
      await saveAnalyticsEvent({
        orderId: event.orderId,
        productId: event.productId,
        type: event.event,
        value: event.data?.value || 0,
        timestamp: new Date()
      });

      // Broadcast to WebSocket clients
      broadcastAnalyticsUpdate(event);

      channel.ack(msg);
    }
  });
};
