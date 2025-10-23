import mongoose, { Schema, Document, Types } from "mongoose";
import { ICategory } from "./category.model";

export interface IProduct extends Document {
  name: string;
  category: Types.ObjectId | ICategory;
  price: number;
  inventoryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    inventoryCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", productSchema);
