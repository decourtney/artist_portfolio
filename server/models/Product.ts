import { Schema, model, Model, Types } from "mongoose";
import Category, { ICategory } from "./Category";

// Define an interface for the Product document
interface IProduct {
  name: string;
  description?: string;
  image?: string;
  price: number;
  quantity: number;
  category: Types.ObjectId | ICategory;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: [
    {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
});

// Create the Product model with the IProduct interface
const Product: Model<IProduct> = model("Product", productSchema, "product");

export type { IProduct };
export default Product;
