import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  customerId: { type: String, required: true },
  items: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
