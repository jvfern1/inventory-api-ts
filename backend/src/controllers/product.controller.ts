import { Request, Response } from "express";
import { ProductService } from "../services/product.service";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";

const productSerivce = new ProductService();

export class ProductController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    const products = await productSerivce.findAll();

    return res.json(products);
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    const product = await productSerivce.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = createProductSchema.parse(req.body);

      const product = await productSerivce.create(data);

      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({
        message: "Validation failed",
        err,
      });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);

      const data = updateProductSchema.parse(req.body);

      const product = await productSerivce.update(id, data);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      return res.status(200).json(product);
    } catch (err) {
      return res.status(404).json({
        message: "Validation failed",
        err,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);

    const deleted = await productSerivce.delete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(204).send();
  }
}
