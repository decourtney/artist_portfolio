import { GraphQLError } from "graphql";
import { User, Product, Category } from "../models";
import { signToken } from "../utils/auth";
import { uploadObject, deleteObject } from "../utils/objectLoader";
import { UploadFile } from "../utils/customServerTypes";
import { GraphQLUpload } from "graphql-upload-ts";

// Need to figure out the correct type definitions
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    user: async (
      parent: any,
      { username }: { username: string },
      context: any
    ) => {
      const user = await User.findOne(
        { username },
        "firstName lastName fullname username email phone street1 street2 city state postalCode profilePic"
      );
      // .select({
      //   firstName: 1,
      //   lastName: 1,
      //   fullname: 1,
      //   username: 1,
      //   email: 1,
      //   phone: 1,
      //   street1: 1,
      //   street2: 1,
      //   city: 1,
      //   state: 1,
      //   postalCode: 1,
      //   profilePic: 1,
      // });

      return user;
    },
    account: async (
      parent: any,
      { username }: { username: string },
      context: any
    ) => {
      const user = await User.findOne(
        { username },
        "username productCount categoryCount"
      )
        // .select({
        //   username: 1,
        //   productCount: 1,
        //   categoryCount: 1,
        // })
        .populate({
          path: "products",
          model: "Product",
        })
        .populate({
          path: "categories",
          model: "Category",
        });

      return user;
    },
    userCategories: async (
      parent: any,
      { username }: { username: String },
      context: any
    ) => {
      const categories = await User.findOne(
        { username: username },
        "categories"
      ).populate({
        path: "categories",
        model: "Category",
        populate: { path: "products", model: "Product" },
      });

      console.log(categories);
      return categories;
    },
    // categoryProducts: async (
    //   parent: any,
    //   { category, username }: { category: String; username: String },
    //   context: any
    // ) => {
    //   const products = await Category.find({ category }).select({
    //     products: 1,
    //   });
    // },
  },

  Mutation: {
    // COMMENT User Mutations
    addUser: async (parent: any, args: any) => {
      // Create user and the default category - All Artwork
      const user = await User.create(args);
      // TODO User can change category names so this wont work
      const defaultCategory = await Category.findOne({ name: "All Artwork" });

      await User.findOneAndUpdate(user._id, {
        $addToSet: { categories: defaultCategory?._id },
      });

      // signToken is expecting _id to be a string
      const userIdAsString = user._id.toString();

      const token = signToken({ ...user, _id: userIdAsString });

      return { token, user };
    },
    updateUser: async (parent: any, args: any, context: any) => {
      if (context.user) {
        // Remove empty fields
        for (const field in args) {
          if (
            args[field] === null ||
            undefined ||
            ""
            // args[field] === undefined ||
            // args[field] === ""
          )
            delete args[field];
        }

        if (Object.keys(args).length === 0) {
          console.log("no args");
          throw new GraphQLError("Nothing Updated");
        }

        const user = await User.findByIdAndUpdate(context.user.data._id, args, {
          runValidators: true,
          new: true,
        });

        return user;
      }
    },
    deleteUser: async () => {
      // Use mongoose Pre-Remove Hook to also remove user data from other documents
    },

    // COMMENT Product Mutations
    addProduct: async (
      parent: any,
      { file }: { file: UploadFile },
      context: any
    ) => {
      if (context.user) {
        // Destructuring file avoids issue with promise wrap in objectLoader - it works so good enough for now
        const { createReadStream, filename, mimetype, encoding } = await file;

        try {
          const bucketResponse = await uploadObject(
            createReadStream(),
            filename,
            mimetype,
            encoding,
            context.user.data.username
          );

          if (!bucketResponse) throw new GraphQLError("No bucket response");

          // All new products should include a default Category. Attempt to find it or create it
          let defaultCategory = null;
          defaultCategory = await Category.findOne(
            {
              name: "All Artwork",
            },
            "_id"
          );

          if (!defaultCategory) {
            defaultCategory = await Category.create({ name: "All Artwork" });
          }

          // Create new product
          const newProduct = await Product.create({
            name: filename.replace(/\.[^.]+$/, ""), // strip file extension
            image: filename,
            categories: [defaultCategory._id],
          });

          // Update User and Category
          await User.findOneAndUpdate(
            { _id: context.user.data._id },
            { $addToSet: { products: newProduct._id } }
          );

          await Category.findOneAndUpdate(
            { name: "All Artwork" },
            { $addToSet: { products: newProduct._id } }
          );

          return true;
        } catch (err: any) {
          console.error(`Error uploading or creating product: ${err.message}`);
          throw new GraphQLError("Failed to upload or create product");
        }
      }
      throw new GraphQLError("You need to be logged in!");
    },
    updateProduct: async () => {},
    deleteProduct: async () => {},

    // COMMENT Category Mutations
    addCategory: async (
      parent: any,
      { username, category }: { username: string; category: string },
      context: any
    ) => {
      if (context.user) {
        try {
          const newCategory = await Category.create({ name: category });

          const user = await User.findOneAndUpdate(
            { _id: context.user.data._id },
            { $addToSet: { categories: newCategory._id } },
            { new: true }
          );

          return user;
        } catch (err: any) {
          console.error("Create Category error: ", err.message);
        }
      }
      throw new GraphQLError("You need to be logged in!");
    },
    updateCategory: async (
      parent: any,
      {
        username,
        category,
        name,
        image,
      }: { username: string; category: string; name: string; image: string },
      context: any
    ) => {
      if (context.user) {
        try {
          const userCategory = await User.findOne(
            { username: username },
            {
              categories: { $elemMatch: { $where: { name: category } } },
            }
          )
            .select("categories")
            .populate({ path: "categories", model: "Category" });

          if (!userCategory || !userCategory.categories.length) {
            throw new GraphQLError("Category not found for the user");
          }

          const categoryId = userCategory?.categories[0]._id;

          const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name: name, image: image },
            { new: true }
          );

          return updatedCategory;
        } catch (err: any) {
          console.error("Create Category error: ", err.message);
        }
      }
      throw new GraphQLError("You need to be logged in!");
    },
    deleteCategory: async () => {},

    // COMMENT AUTH Mutation
    login: async (
      parent: any,
      { email, password }: { email: any; password: any }
    ) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new GraphQLError("Incorrect credentials");
      }

      const token = signToken({
        username: user.username,
        email: user.email,
        _id: user._id.toString(),
      });
      return { token, user };
    },
  },
};

export default resolvers;
