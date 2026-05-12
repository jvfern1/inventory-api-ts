import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productSerivce = new ProductService();

export class ProductController {
  findAll(req: Request, res: Response): Response {
    const products = productSerivce.findAll();

    return res.json(products);
  }

  findById(req: Request, res: Response): Response {
    const id = Number(req.params.id);

    const product = productSerivce.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json(product);
  }

  create(req: Request, res: Response): Response {
    const product = productSerivce.create(req.body);

    return res.status(201).json(product);
  }

  update(req: Request, res: Response): Response {
    const id = Number(req.params.id);

    const { name, description, price, stock_quantity } = req.body;

    const product = productSerivce.update(id, {
      name,
      description,
      price,
      stock_quantity,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json(product);
  }

  delete(req: Request, res: Response): Response {
    const id = Number(req.params.id);

    const deleted = productSerivce.delete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(204).send();
  }
}
