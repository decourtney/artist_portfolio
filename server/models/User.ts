import { Model, Schema, Types, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import Product, { IProduct } from "./Product";
import { ICategory } from "./Category";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  profilePic: string;
  products: IProduct[];
  categories: ICategory[];

  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email address"],
  },
  username: {
    type: String,
    required: false,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    validate: {
      validator: function (value: string) {
        return /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
          value
        );
      },
      message: "Invalid phone number",
    },
  },
  street1: { type: String, required: false, trim: true },
  street2: { type: String, required: false, trim: true },
  city: { type: String, required: false, trim: true },
  state: { type: String, required: false, trim: true },
  postalCode: { type: String, required: false, trim: true },
  profilePic: {
    type: String,
    required: false,
    default: "default_avatar.png",
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
      required: false,
    },
  ],
  categories: [
    {
      type: Types.ObjectId,
      ref: "Category",
      required: false,
    },
  ],
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual("fullname").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual("productCount").get(function () {
  return `${this.products.length}`;
});

userSchema.virtual("categoryCount").get(function () {
  return `${this.categories.length}`;
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  if (this.isNew) {
    this.username = this.email.split("@")[0];
  }

  if(this.isModified('phone')){
    
  }
  next();
});

userSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    const match = error.message.match(/index: (\w+)_1/);
    const fieldName = match ? match[1] : "unknown";

    // console.log(error.message);
    // console.log(fieldName);

    let errorMessage = "";
    switch (fieldName) {
      case "email":
        errorMessage = "Email address is already in use.";
        break;
      case "username":
        errorMessage = "Username is already in use";
        break;
      default:
        errorMessage = "Duplicate key error.";
    }

    next(new Error(errorMessage));
  } else {
    next(error);
  }
});

userSchema.set("toJSON", { virtuals: true });

const User: Model<IUser> = model("User", userSchema, "user");

export type { IUser };
export default User;
