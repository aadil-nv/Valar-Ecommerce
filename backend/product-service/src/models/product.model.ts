import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  categoryId: string;
  price: number;
  inventoryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  categoryId: { type: String, required: true },
  price: { type: Number, required: true },
  inventoryCount: { type: Number, default: 0 },
}, { timestamps: true });

export const Product = mongoose.model<IProduct>("Product", productSchema);
