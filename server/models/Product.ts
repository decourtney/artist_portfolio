import { Schema, model, Model, Types, Document } from "mongoose";
import { ICategory } from "./Category";
import { IUser } from "./User";

// Define an interface for the Product document
interface IProduct extends Document {
  name: string;
  description?: string;
  image?: string;
  price: number;
  quantity: number;
  user: IUser;
  categories: ICategory[];
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  categories: [
    {
      type: Types.ObjectId,
      ref: "Category",
      required: false,
    },
  ],
});

// Define a pre-save middleware to handle name uniqueness
productSchema.pre<IProduct>("save", async function (next) {
  try {
    if (!this.isNew || !this.isModified("name")) {
      // If the document is not new or the name is not modified, move on
      return next();
    }

    // Check if the name is unique
    let existingProduct = await Product.findOne({ name: this.name });

    if (existingProduct) {
      // If a product with the same name exists, add a suffix (#) to the name
      let newName = this.name;
      let counter = 1;
      while (existingProduct) {
        newName = `${this.name}(${counter})`;
        existingProduct = await Product.findOne({ name: newName });
        counter++;
      }
      this.name = newName;
    }

    next();
  } catch (err: any) {
    next(err.message);
  }
});

// Create the Product model with the IProduct interface
const Product: Model<IProduct> = model("Product", productSchema, "product");

export type { IProduct };
export default Product;
