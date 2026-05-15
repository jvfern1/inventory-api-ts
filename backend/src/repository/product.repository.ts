import { prisma } from "../database/prisma";
import { Product } from "@prisma/client";

type CreateProductData = {
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
};

type UpdateProductData = Partial<CreateProductData>;

export class ProductRepository {
  public async findAll(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  public async findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  public async create(data: CreateProductData): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  public async update(id: number, data: UpdateProductData): Promise<Product> {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    });
  }

  public async delete(id: number): Promise<void> {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
