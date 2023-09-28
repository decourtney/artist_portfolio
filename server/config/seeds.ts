import db from "./connection";
import { User, Product, Category } from "../models";
import {
  uploadImage,
  downloadImage,
  deleteImage,
} from "../utils/objectLoader";
import fs from "fs";

const imagePath = "../BangEqual.png";
const imageBuffer = fs.readFileSync(imagePath);

db.once("open", async () => {
  // test objectLoader functions
  // await uploadObject();
  // await downloadObject();
  // await deleteObject();

  try {
    await User.deleteMany();
  } catch (err) {
    console.log(err);
  }
  try {
    await Product.deleteMany();
  } catch (err) {
    console.log(err);
  }
  try {
    await Category.deleteMany();
  } catch (err) {
    console.log(err);
  }

  try {
    await Category.create({
      name: "Category Name",
    });
  } catch (err) {
    console.log(err);
  }

  try {
    await User.create({
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
    const uploadResult = await uploadImage(imageBuffer, "image.png");
    const category = await Category.findOne({ name: "Category Name" });

    // console.log(uploadResult);
    await Product.create({
      name: "Image",
      description: "description provided by user",
      image: "image.png",
      category: category?._id,
    });
  } catch (err) {
    console.log(err);
  }

  try {
    const deleteResult = await deleteImage("image.png");
    // console.log(deleteResult)
  } catch (err) {
    console.log(err);
  }

  process.exit();
});
