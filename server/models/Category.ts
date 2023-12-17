import { Schema, model, Model, Types, Document } from "mongoose";
import { IProduct } from "./Product";

// Define an interface for the Category document
interface ICategory extends Document {
  name: string;
  image: string;
  defaultCategory: Boolean;
  products: IProduct[];
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  defaultCategory: {
    type: Boolean,
    required: true,
    default: false,
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
      required: false,
    },
  ],
});

// Create the Category model with the ICategory interface
const Category: Model<ICategory> = model(
  "Category",
  categorySchema,
  "category"
);

export type { ICategory };
export default Category;
