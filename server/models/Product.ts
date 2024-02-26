import { Schema, model, Model, Types, Document } from "mongoose";
import { ICategory } from "./Category";
import { IUser } from "./User";

// Define an interface for the Product document
interface IProduct extends Document {
  name: string;
  image?: string;
  medium: string;
  substrate: string;
  dimensions: string;
  description?: string;
  price: number;
  quantity: number;
  user: IUser;
  categories: ICategory[];
}

const mediumEnum = {
  values: [
    "acrylic",
    "oil paint",
    "pencil",
    "ink",
    "marker",
    "fresco",
    "watercolor",
    "watercolor pencil",
    "tempera",
    "chalk",
    "encaustic",
    "oil",
    "digital",
    "clay",
    "glass",
    "gouache",
    "pastel",
    "charcoal",
    "graphite",
    "oil pastels",
    "mixed",
    "crayon",
    "photography",
  ],
  message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
};

const substratesEnum = {
  values: [
    "acrylic",
    "aluminum",
    "construction paper",
    "canvas",
    "paper",
    "glass",
    "metal",
    "wood",
    "plastic",
  ],
  message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
};

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    enum: mediumEnum,
    required: false,
  },
  substrate: {
    type: String,
    enum: substratesEnum,
    required: false,
  },
  dimensions: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 200,
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
