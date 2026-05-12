import { Product } from "../types/product";
import { ProductRepository } from "../repository/product.repository";

const productRepository = new ProductRepository();

type CreateProductData = {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
};

type UpdateProductData = Partial<CreateProductData>;

export class ProductService {
  findAll(): Product[] {
    return productRepository.findAll();
  }

  findById(id: number): Product | undefined {
    return productRepository.findById(id);
  }

  create(data: CreateProductData): Product {
    const product: Product = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      price: data.price,
      stock_quantity: data.stock_quantity,
      created_at: new Date(),
    };

    return productRepository.create(product);
  }

  update(id: number, data: UpdateProductData): Product | undefined {
    const product = productRepository.findById(id);

    if (!product) {
      return undefined;
    }

    return productRepository.update(product, data);
  }

  delete(id: number): boolean {
    const productIndex = productRepository.findByIndex(id);

    if (productIndex === -1) {
      return false;
    }

    productRepository.delete(productIndex);

    return true;
  }
}
