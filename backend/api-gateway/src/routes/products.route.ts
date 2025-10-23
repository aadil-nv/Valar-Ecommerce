import { Router, Request, Response, NextFunction } from "express";
import { httpClient } from "../services/httpClient";
import { config } from "../config/env.config";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient("GET", `${config.PRODUCT_SERVICE_URL}/products`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient("PATCH", `${config.PRODUCT_SERVICE_URL}/products/${req.params.id}`, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
