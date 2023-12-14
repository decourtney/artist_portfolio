import db from "./connection";
import { User, Product, Category } from "../models";
import { uploadObject, deleteObject } from "../utils/objectLoader";
import fs from "fs";

const profilePicPath = "../profile_pic.png";
const profilePicBuffer = fs.readFileSync(profilePicPath);

db.once("open", async () => {
  // Clear DB
  try {
    await User.deleteMany();
    console.log("Users deleted");

    await Product.deleteMany();
    console.log("Products deleted");

    await Category.deleteMany();
    console.log("Categories deleted");
    
  } catch (err) {
    console.log(err);
  }

  // Create a category
  try {
    await Category.create({ name: "All Artwork" });
  } catch (err) {
    console.log(err);
  }

  let newCategory;
  try {
    newCategory = await Category.findOne({ name: "All Artwork" });
  } catch (err) {
    console.log(err);
  }

  // Create a user
  try {
    await User.create({
      firstName: "Default",
      lastName: "User",
      username: "defaultuser",
      email: "defaultuser@default.com",
      password: "password",
      role: "owner",
      profilePic: "default_avatar.png",
    });
  } catch (err) {
    console.log(err);
  }

  let newUser;
  try {
    newUser = await User.findOne({ email: "defaultuser@default.com" });
  } catch (err) {
    console.log(err);
  }

  // Create a product
  try {
    await Product.create({
      name: "Default Image",
      description: "Default description of image",
      image: "defaultimage.png",
    });
  } catch (err) {
    console.log(err);
  }

  let newProduct;
  try {
    newProduct = await Product.findOne({ name: "Default Image" });
  } catch (err) {
    console.log(err);
  }

  // Update Docs
  try {
    await User.findOneAndUpdate(
      { _id: newUser?._id },
      { $addToSet: { products: newProduct?._id, categories: newCategory?._id } }
    );
    await Product.findOneAndUpdate(
      { _id: newProduct?._id },
      { $addToSet: { categories: newCategory?._id } }
    );
    await Category.findOneAndUpdate(
      { _id: newCategory?._id },
      { $addToSet: { products: newProduct?._id } }
    );
  } catch (err) {
    console.log(err);
  }

  console.warn("DB is seeded");
  process.exit();
});
