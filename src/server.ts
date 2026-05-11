import type { Application } from "express";
const express = require("express");

const app: Application = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  app.listen(port, (): void => {
    console.log(`Connected on port: ${port}`);
  });
} catch (err: any) {
  console.log(`Error: ${err}`);
}

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  created_at: Date;
};

const products: Product[] = [];

app.post("/products", (req, res) => {
  const { name, description, price, stock_quantity } = req.body;

  const product: Product = {
    id: products.length + 1,
    name,
    description,
    price,
    stock_quantity,
    created_at: new Date(),
  };

  products.push(product);

  return res.status(201).json(product);
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  return res.json(product);
});

app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, description, price } = req.body;

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  product.name = name;
  product.description = description;
  product.price = price;

  return res.status(200).json(product);
});

app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product_index = products.findIndex((product) => product.id === id);

  if (!product_index) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products.splice(product_index, 1);

  return res.status(204).send();
});
