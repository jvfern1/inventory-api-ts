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
  public async findAll(): Promise<Product[]> {
    return await productRepository.findAll();
  }

  public async findById(id: number): Promise<Product | null> {
    return await productRepository.findById(id);
  }

  public async create(data: CreateProductData): Promise<Product> {
    return await productRepository.create(data);
  }

  public async update(
    id: number,
    data: UpdateProductData,
  ): Promise<Product | null> {
    const product = await productRepository.findById(id);

    if (!product) {
      return null;
    }

    return await productRepository.update(id, data);
  }

  public async delete(id: number): Promise<boolean> {
    const product = await productRepository.findById(id);

    if (!product) {
      return false;
    }

    await productRepository.delete(id);

    return true;
  }
}
