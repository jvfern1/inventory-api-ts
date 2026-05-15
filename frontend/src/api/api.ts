import type { Product } from "../types/product";

const API_URL = "http://localhost:8080";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json();
}
