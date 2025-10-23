import { Request, Response, NextFunction } from "express";
import * as ProductService from "../services/product.service";
import { publishProductEvent } from "../queues/product.queue";

export const createProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await ProductService.createProduct(req.body);

    // Publish product created event
    await publishProductEvent("product_created", product);

    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await ProductService.getProducts();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const product = await ProductService.updateProduct(productId, req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const updateInventoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const { inventoryCount } = req.body;
    const product = await ProductService.updateInventory(productId, inventoryCount);

    // Publish inventory update event
    await publishProductEvent("inventory_updated", product);

    res.json(product);
  } catch (err) {
    next(err);
  }
};
