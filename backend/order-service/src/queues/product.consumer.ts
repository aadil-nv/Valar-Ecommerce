import { consumeProductEvents } from "./product.queue";
import * as OrderService from "../services/order.service";

// Updated interface to include orderId
export interface ProductEventData {
  productId: string;
  name?: string;
  price?: number;
  inventory?: number;
  eventType: string;
  categoryName?: string;
  orderId?: string; // added to track which order caused this event
}

export interface ProductEventMessage {
  event: string;
  data: ProductEventData;
}

// Handle product events coming from the queue
export const handleProductEvents = async (msg: ProductEventMessage) => {
  const { event, data } = msg;

  if (event === "inventory_update_failed" && data.orderId) {
    console.log("❌ Rolling back order:", data.orderId);
    await OrderService.markOrderAsFailed(data.orderId);
  }
};

// Start the consumer
export const startProductConsumer = async () => {
  await consumeProductEvents(handleProductEvents);
};
