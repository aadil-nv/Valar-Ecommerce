import { Types } from "mongoose";
import { Product, IProduct } from "../models/product.model";

export const createProduct = async (data: Partial<IProduct>) => {
  const product = new Product(data);
  await product.save();
  return product;
};

export const getProducts = async () => {
  return await Product.find().sort({ createdAt: -1 });
};

export const updateProduct = async (productId: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(productId, data, { new: true });
};

export const updateInventory = async (productId: string, count: number) => {
  return await Product.findByIdAndUpdate(productId, { inventoryCount: count }, { new: true });
};


export const decreaseStock = async (productId: string, quantity: number) => {    
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");
  if (product.inventoryCount < quantity) throw new Error("Not enough inventory");
  product.inventoryCount -= quantity;
  await product.save();
  return product;
};

export const bulkSoftDeleteProducts = async (productIds: string[]) => {
    console.log("sof deleted sevive==>",productIds);
    
  const objectIds = productIds.map((id) => new Types.ObjectId(id));

  const result = await Product.updateMany(
    { _id: { $in: objectIds }, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() }
  );

  return result;
};