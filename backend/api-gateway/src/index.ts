import express from "express";
import cors from "cors";
import { config } from "./config/env.config";
import ordersRouter from "./routes/orders";
import productsRouter from "./routes/products";
import analyticsRouter from "./routes/analytics";
import alertsRouter from "./routes/alerts";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/error.handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/alerts", alertsRouter);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`API Gateway running on port ${config.PORT}`);
});
