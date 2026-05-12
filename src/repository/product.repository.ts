import type { Product } from "../types/product";

export class ProductRepository {
  private products: Product[] = [];

  public findAll(): Product[] {
    return this.products;
  }

  public findById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  public create(product: Product): Product {
    this.products.push(product);

    return product;
  }

  public update(product: Product, data: Partial<Product>): Product | undefined {
    Object.assign(product, data);

    return product;
  }

  public delete(productIndex: number): void {
    this.products.splice(productIndex, 1);
  }

  public findByIndex(id: number): number {
    return this.products.findIndex((product) => product.id === id);
  }
}
