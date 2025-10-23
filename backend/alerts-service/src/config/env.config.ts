import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5004,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/alerts",
  RABBITMQ_URI: process.env.RABBITMQ_URI || "amqp://localhost"
};
