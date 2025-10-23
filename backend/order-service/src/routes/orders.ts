import { Router } from "express";
import { createOrderController, getOrdersController, updateOrderStatusController } from "../controllers/orders.controllers";

const router = Router();

router.post("/", createOrderController);
router.get("/", getOrdersController);
router.patch("/:orderId/status", updateOrderStatusController);

export default router;
