import db from "./connection";
import { User, Product, Category } from "../models";
import { uploadObject, deleteObject } from "../utils/objectLoader";
import fs from "fs";

const profilePicPath = "../profile_pic.png";
const profilePicBuffer = fs.readFileSync(profilePicPath);

db.once("open", async () => {
  // Delete
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

  // Create
  try {
    await Category.create({ name: "All Artwork", defaultCategory: true });
    console.log("Category created");

    const user = await User.create({
      firstName: "Default",
      lastName: "User",
      username: "defaultuser",
      email: "defaultuser@default.com",
      password: "password",
      role: "owner",
      profilePic: "default_avatar.png",
    });
    console.log("User created");

    await Product.create({
      name: "Default Image",
      description: "Default description of image",
      image: "defaultimage.png",
      user: user._id,
    });
    console.log("Product created");
  } catch (err) {
    console.log(err);
  }

  // Read
  let newCategory;
  let newUser;
  let newProduct;
  try {
    newCategory = await Category.findOne({ name: "All Artwork" });
    console.log("Category read");

    newUser = await User.findOne({ email: "defaultuser@default.com" });
    console.log("User read");

    newProduct = await Product.findOne({ name: "Default Image" });
    console.log("Product read");
  } catch (err) {
    console.log(err);
  }

  // Update
  try {
    await User.findOneAndUpdate(
      { _id: newUser?._id },
      { $addToSet: { products: newProduct?._id, categories: newCategory?._id } }
    );
    console.log("Category updated");

    await Product.findOneAndUpdate(
      { _id: newProduct?._id },
      { $addToSet: { categories: newCategory?._id } }
    );
    console.log("Product updated");

    await Category.findOneAndUpdate(
      { _id: newCategory?._id },
      { $addToSet: { products: newProduct?._id } }
    );
    console.log("Product updated");
  } catch (err) {
    console.log(err);
  }

  // try {
  //   const test = await User.findOne(
  //     { username: "defaultuser" },
  //     {
  //       categories: { $elemMatch: { $where: { name: "All Artwork" } } },
  //     }
  //   )
  //     .select("categories")
  //     .populate({ path: "categories", model: "Category" });

  //   const test2 = await Category.findByIdAndUpdate(
  //     test?.categories[0]._id,
  //     { name: "new name" },
  //     { new: true }
  //   );

  //   console.log(test2);
  // } catch (err) {
  //   console.log(err);
  // }

  console.warn("DB seeded");
  process.exit();
});
