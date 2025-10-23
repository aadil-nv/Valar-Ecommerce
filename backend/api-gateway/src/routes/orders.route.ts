import { Router, Request, Response, NextFunction } from "express";
import { httpClient } from "../services/httpClient";
import { config } from "../config/env.config";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient("GET", `${config.ORDER_SERVICE_URL}/orders`);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await httpClient("POST", `${config.ORDER_SERVICE_URL}/orders`, req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
