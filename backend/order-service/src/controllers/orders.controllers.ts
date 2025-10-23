import { Request, Response, NextFunction } from "express";
import * as OrderService from "../services/order.service";
import { publishOrderEvent, OrderEventData } from "../queues/order.queue";
import { Types } from "mongoose";

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await OrderService.createOrder(req.body);

    const orderEventData: OrderEventData = {
      orderId: (order._id as Types.ObjectId).toString(), // cast _id to ObjectId
      customerId: order.customerId,
      total: order.total,
      items: order.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    };

    await publishOrderEvent("order_created", orderEventData);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
export const getOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await OrderService.getOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await OrderService.updateOrderStatus(orderId, status);
    res.json(order);
  } catch (err) {
    next(err);
  }
};
