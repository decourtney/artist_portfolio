import db from "./connection";
import { User, Product, Category } from "../models";
import { uploadObject, deleteObject } from "../utils/objectLoader";
import fs from "fs";

const profilePicPath = "../profile_pic.png";
const profilePicBuffer = fs.readFileSync(profilePicPath);

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
      username: "tempuser",
      email: "tempuser@gmail.com",
      password: "password",
      role: "owner",
      profilePic: "default_avatar.png",
    });
  } catch (err) {
    console.log(err);
  }
  console.log(newUser?.email.split("@")[0]);

  // try {
  //   await uploadObject(
  //     profilePicBuffer,
  //     `${newUser?.email.split("@")[0]}/${newUser?.profilePic}`
  //   );
  // } catch (err) {
  //   console.log(err);
  // }

  let category;
  try {
    category = await Category.findOne({ name: "Category Name" });
  } catch (err) {
    console.log(err);
  }

  try {
    const newProduct = await Product.create({
      name: "Image",
      description: "description provided by user",
      image: "image.png",
      categories: category?._id,
    });

    // await uploadObject(
    //   profilePicBuffer,
    //   `${newUser?.email.split("@")[0]}/${newProduct.image}`
    // );

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
  process.exit();
});
