import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5001,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/orders",
  RABBITMQ_URI: process.env.RABBITMQ_URI || "amqp://localhost",
  PRODUCT_SERVICE_URL:process.env.PRODUCT_SERVICE_URL,
  ALERTS_SERVICE_URL:process.env.ALERTS_SERVICE_URL
};
