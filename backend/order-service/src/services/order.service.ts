import { Order, IOrder } from "../models/order.model";

export const createOrder = async (data: Partial<IOrder>) => {
  const order = new Order(data);
  await order.save();
  return order;
};

export const getOrders = async () => {
  return await Order.find().sort({ createdAt: -1 });
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};
