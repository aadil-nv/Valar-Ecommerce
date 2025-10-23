import { Router } from "express";
import {
  createProductController,
  getProductsController,
  updateProductController,
  updateInventoryController
} from "../controllers/products.controller";

const router = Router();

router.post("/", createProductController);
router.get("/", getProductsController);
router.patch("/:productId", updateProductController);
router.patch("/:productId/inventory", updateInventoryController);

export default router;
