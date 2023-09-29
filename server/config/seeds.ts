import db from "./connection";
import { User, Product, Category } from "../models";
import { uploadObject, deleteObject } from "../utils/objectLoader";
import fs from "fs";

const imagePath = "../BangEqual.png";
const imageBuffer = fs.readFileSync(imagePath);

db.once("open", async () => {
  try {
    await User.deleteMany();
    console.log("Users deleted");
  } catch (err) {
    console.log(err);
  }
  try {
    await Product.deleteMany();
    console.log("Products deleted");
  } catch (err) {
    console.log(err);
  }
  try {
    await Category.deleteMany();
    console.log("Categories deleted");
  } catch (err) {
    console.log(err);
  }

  // Create a category
  try {
    await Category.create({ name: "Category Name" });
  } catch (err) {
    console.log(err);
  }

  // Create a user
  let newUser;
  try {
    newUser = await User.create({
      firstName: "Temp",
      lastName: "User",
      email: "tempuser@gmail.com",
      password: "password",
      role: "owner",
    });
  } catch (err) {
    console.log(err);
  }

  try {
    await uploadObject(imageBuffer, "image.png");
    const category = await Category.findOne({ name: "Category Name" });

    if (!category)
      console.log(
        "There was an issue finding the requested category... Continuing with Product creation."
      );

    const newProduct = await Product.create({
      name: "Image",
      description: "description provided by user",
      image: "image.png",
      category: category?._id,
    });

    if (newUser)
      await User.findOneAndUpdate(
        { _id: newUser._id },
        { $addToSet: { products: newProduct._id } }
      );

    console.log("Product creation complete");
  } catch (err) {
    console.log(err);
  }

  console.warn("DB is seeded");
  // try {
  //   const deletedImage = await deleteObject("image.png");
  //   if (!deletedImage) throw new Error("Could not find image by that name");

  //   const deletedProduct = await Product.findOneAndDelete({
  //     image: "image.png",
  //   });

  //   if (!deletedProduct)
  //     throw new Error("Could not find the Product entry in the DB");

  //   if (deletedProduct) {
  //     await User.updateMany(
  //       { products: { $in: [deletedProduct._id] } },
  //       { $pull: { products: deletedProduct._id } }
  //     );

  //     console.log("Removed Product and references to Users");
  //   }
  // } catch (err) {
  //   console.log(err);
  // }

  process.exit();
});
