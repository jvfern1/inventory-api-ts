import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  type CreateProductDTO,
} from "../api/api";

import type { Product } from "../types/product";

const initialForm: CreateProductDTO = {
  name: "",
  description: "",
  price: "",
  stock_quantity: "",
};

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<CreateProductDTO>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price),
      stock_quantity: Number(form.stock_quantity),
    };

    if (editingId !== null) {
      await updateProduct(editingId, productData);
    } else {
      await createProduct(productData);
    }

    setForm(initialForm);
    setEditingId(null);

    await loadProducts();
  }

  function handleEdit(product: Product) {
    setEditingId(product.id);

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock_quantity: product.stock_quantity,
    });
  }

  async function handleDelete(id: number) {
    await deleteProduct(id);
    await loadProducts();
  }

  return (
    <main className="container">
      <section className="header">
        <div>
          <span className="tag">Inventory API</span>

          <h1>Controle de Produtos</h1>

          <p>Gerencie seu estoque de forma simples.</p>
        </div>
      </section>

      <section className="content">
        <form className="card form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Editar produto" : "Novo produto"}</h2>

          <label>
            Nome
            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              placeholder="Ex: Teclado mecânico"
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Descrição do produto"
              required
            />
          </label>

          <div className="row">
            <label>
              Preço
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                required
              />
            </label>

            <label>
              Estoque
              <input
                type="number"
                value={form.stock_quantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stock_quantity:
                      e.target.value === "" ? "" : Number(e.target.value),
                  })
                }
                required
              />
            </label>
          </div>

          <button type="submit">
            {editingId ? "Salvar alterações" : "Cadastrar produto"}
          </button>

          {editingId && (
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
            >
              Cancelar edição
            </button>
          )}
        </form>

        <section className="card list">
          <h2>Produtos cadastrados</h2>

          {products.length === 0 ? (
            <p className="empty">Nenhum produto cadastrado.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.name}</strong>

                        <span>{product.description}</span>
                      </td>

                      <td>R$ {Number(product.price).toFixed(2)}</td>

                      <td>{product.stock_quantity}</td>

                      <td className="actions">
                        <button onClick={() => handleEdit(product)}>
                          Editar
                        </button>

                        <button
                          className="danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
