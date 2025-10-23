import { Request, Response, NextFunction } from "express";
import * as OrderService from "../services/order.service";
import { publishOrderEvent } from "../queues/order.queue";

export const createOrderController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await OrderService.createOrder(req.body);

    // Publish event to RabbitMQ
    await publishOrderEvent("order_created", order);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrdersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderService.getOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatusController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await OrderService.updateOrderStatus(orderId, status);
    res.json(order);
  } catch (err) {
    next(err);
  }
};
