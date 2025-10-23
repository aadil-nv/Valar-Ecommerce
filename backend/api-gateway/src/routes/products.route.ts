import { Router, Request, Response, NextFunction } from "express";
import { httpClient } from "../services/httpClient";
import { config } from "../config/env.config";

const router = Router();

// Get all products
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient("GET", `${config.PRODUCT_SERVICE_URL}/api/products`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Get single product by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient("GET", `${config.PRODUCT_SERVICE_URL}/api/products/${req.params.id}`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Create a new product
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient("POST", `${config.PRODUCT_SERVICE_URL}/api/products`, req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

// Update a product
router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient("PATCH", `${config.PRODUCT_SERVICE_URL}/api/products/${req.params.id}`, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
});
router.patch("/bulk-delete", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient(
      "PATCH",
      `${config.PRODUCT_SERVICE_URL}/api/products/bulk-delete`,
      req.body
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});


export default router;
