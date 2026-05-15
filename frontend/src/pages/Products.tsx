import { useEffect, useState } from "react";
import { getProducts } from "../api/api";
import type { Product } from "../types/product";

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div>
      <h1>Produtos</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>

          <p>{product.description}</p>

          <p>Preço: R$ {product.price}</p>

          <p>Estoque: {product.stock_quantity}</p>
        </div>
      ))}
    </div>
  );
}
