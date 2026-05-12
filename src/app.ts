import express from "express";
import { productRoutes } from "./routes/product.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRoutes);

export { app };
