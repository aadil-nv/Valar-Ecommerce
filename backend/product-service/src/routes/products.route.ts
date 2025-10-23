import { Router } from "express";
import { createProductController, getProductsController, updateInventoryController, updateProductController } from "../controllers/products.controller";

const router = Router();

router.post("/", createProductController); // expects categoryId in body
router.get("/", getProductsController);
router.patch("/:productId", updateProductController);
router.patch("/:productId/inventory", updateInventoryController);

export default router;
