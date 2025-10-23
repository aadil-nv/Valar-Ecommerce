import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || "http://localhost:5001",
  PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || "http://localhost:5002",
  ANALYTICS_SERVICE_URL: process.env.ANALYTICS_SERVICE_URL || "http://localhost:5003",
  ALERTS_SERVICE_URL: process.env.ALERTS_SERVICE_URL || "http://localhost:5004"
};
