import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/products", productController.findAll);
productRoutes.get("/products/:id", productController.findById);
productRoutes.post("/products", productController.create);
productRoutes.put("/products/:id", productController.update);
productRoutes.delete("/products/:id", productController.delete);

export { productRoutes };
