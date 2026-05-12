import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be greated than zero"),
  stock_quantity: z.number().int().min(0, "Stock quantity cannot be negative"),
});
