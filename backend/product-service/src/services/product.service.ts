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
