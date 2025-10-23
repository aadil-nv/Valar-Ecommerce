import { Router } from "express";
import {
  bulkSoftDeleteProductsController,
  createProductController,
  getProductsController,
  updateInventoryController,
  updateProductController,
} from "../controllers/products.controller";

const router = Router();

router.post("/", createProductController); 
router.get("/", getProductsController);

router.patch("/bulk-delete", bulkSoftDeleteProductsController);

router.patch("/:productId/inventory", updateInventoryController);
router.patch("/:productId", updateProductController);

export default router;
