import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5002,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/products",
  RABBITMQ_URI: process.env.RABBITMQ_URI || "amqp://localhost",
  ALERTS_SERVICE_URL:process.env.ALERTS_SERVICE_URL 

};
