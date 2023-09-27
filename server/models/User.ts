import { Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import Product, { IProduct } from "./Product";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  products: IProduct[];
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  role:{
    type: String,
    required: true,
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = model("User", userSchema);

export type { IUser };
export default User;
