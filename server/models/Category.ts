import { Schema, model, Model, Document } from "mongoose";

// Define an interface for the Category document
interface ICategory extends Document{
  name: string;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the Category model with the ICategory interface
const Category: Model<ICategory> = model("Category", categorySchema, "category");

export type { ICategory };
export default Category;
