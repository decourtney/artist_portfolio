import { Schema, model, Model, Types, Document } from "mongoose";
import { IProduct } from "./Product";

// Define an interface for the Category document
interface ICategory extends Document {
  name: string;
  image: string;
  products: IProduct[];
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
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

categorySchema.pre("save", function (next) {
  if (this.name === "All Artwork") {
    const err = new Error("Cannot modify or remove the All Artwork category.");
    next(err);
  } else {
    next();
  }
});

// Create the Category model with the ICategory interface
const Category: Model<ICategory> = model(
  "Category",
  categorySchema,
  "category"
);

export type { ICategory };
export default Category;
