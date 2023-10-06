import { Model, Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";
import Product, { IProduct } from "./Product";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  profilePic: string;
  products: IProduct[];
  confirmPassword: string; // Dont think i need this but nothing is broken for now

  // Include custom methods like isCorrectPassword
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
    validate: {
      validator: async function (value: string) {},
      message: "blah",
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  role: {
    type: String,
    required: false,
    enum: ["admin", "owner", "user"],
  },
  profilePic: {
    type: String,
    required: false,
    default:
      "default_avatar.png",
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "Product",
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

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  // if (this.isNew || this.isModified("email")) {
  //   this.username = this.email.split("@")[0];
  // }
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
