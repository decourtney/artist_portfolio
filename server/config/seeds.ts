import db from "./connection"
import { User, Product, Category } from "../models";

db.once('open', async () => {
  await Category.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  

  process.exit();
});
