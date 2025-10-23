import {  consumeOrderEvents } from "../queues/order.queue";
import * as ProductService from "../services/product.service";
import { publishProductEvent } from "./product.queue";


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

export const handleOrderCreated = async (msg: OrderEventMessage) => {
  const { data } = msg;

  try {
    for (const item of data.items) {
      await ProductService.decreaseStock(item.productId, item.quantity);
    }

    // ✅ Publish success
    await publishProductEvent("inventory_updated_success", {
      productId: "",
      eventType: "inventory_updated_success",
      categoryName: "",
    });

  } catch (error) {
    console.error("❌ Product stock update failed:", error);

    // ❌ Notify order service
    await publishProductEvent("inventory_update_failed", {
      productId: "",
      eventType: "inventory_update_failed",
      categoryName: "",
    });
  }
};

export const startOrderConsumer = async () => {
  await consumeOrderEvents(handleOrderCreated);
};
