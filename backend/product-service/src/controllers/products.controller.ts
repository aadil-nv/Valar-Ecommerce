import { Request, Response, NextFunction } from "express";
import * as ProductService from "../services/product.service";
import { ProductEventData, publishProductEvent } from "../queues/product.queue";
import { IProduct } from "../models/product.model";
import { Types } from "mongoose";

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {    
  try {
    const product: IProduct = await ProductService.createProduct(req.body);

    const populatedProduct = await product.populate<{ category: { name: string } }>("category");

    const eventData: ProductEventData = {
      productId: (populatedProduct._id as Types.ObjectId).toString(),
      name: populatedProduct.name,
      price: populatedProduct.price,
      inventory: populatedProduct.inventoryCount,
      categoryName: populatedProduct.category?.name,
      eventType: "product_created",
    };

    await publishProductEvent("product_created", eventData);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products: IProduct[] = await ProductService.getProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const product = await ProductService.updateProduct(productId, req.body);

    if (!product) return res.status(404).json({ error: "Product not found" });

    const populatedProduct = await product.populate<{ category: { name: string } }>("category");
    res.json(populatedProduct);
  } catch (err) {
    next(err);
  }
};

export const updateInventoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const { inventoryCount } = req.body;
    const product = await ProductService.updateInventory(productId, inventoryCount);

    if (!product) return res.status(404).json({ error: "Product not found" });

    const populatedProduct = await product.populate<{ category: { name: string } }>("category");

    const eventData: ProductEventData = {
      productId: (populatedProduct._id as Types.ObjectId).toString(),
      name: populatedProduct.name,
      price: populatedProduct.price,
      inventory: populatedProduct.inventoryCount,
      categoryName: populatedProduct.category?.name,
      eventType: "inventory_updated",
    };

    await publishProductEvent("inventory_updated", eventData);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const bulkSoftDeleteProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productIds } = req.body;
    console.log("product fromcontroller",productIds);
    

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: "productIds must be a non-empty array" });
    }

    const result = await ProductService.bulkSoftDeleteProducts(productIds);

    res.status(200).json({
      message: `${result.modifiedCount} products soft deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};
