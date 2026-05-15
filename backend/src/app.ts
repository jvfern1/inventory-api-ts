import express from "express";
import cors from "cors";
import { productRoutes } from "./routes/product.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(productRoutes);

export { app };
