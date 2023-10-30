import { AuthenticationError } from "apollo-server-core";
import { UserInputError } from "apollo-server-core";
import { User, Product, Category } from "../models";
import { signToken } from "../utils/auth";
import { uploadObject, deleteObject } from "../utils/objectLoader";
import { UploadFile } from "../utils/customServerTypes";

// Need to figure out the correct type definitions
const resolvers = {
  Upload: require("graphql-upload-ts").GraphQLUpload,
  Query: {
    // NOTE Query ME not currently in use
    me: async (parent: any, args: any, context: any) => {
      if (context.user) {
        const stuff = await User.findOne({ _id: context.user._id });
        console.log(stuff);
        return stuff;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    user: async (
      parent: any,
      { username }: { username: string },
      context: any
    ) => {
      const user = await User.findOne({ username }).populate({
        path: "products",
        model: "Product",
        populate: [
          {
            path: "categories",
            model: "Category",
          },
        ],
      });

      return user;
    },
    account: async (
      parent: any,
      { username }: { username: string },
      context: any
    ) => {
      const products = await User.findOne({ username }).populate({
        path: "products",
        model: "Product",
        populate: [{ path: "categories", model: "Category" }],
      });

      return products;
    },
    categories: async (parent: any, args: any, context: any) => {
      return Category.find();
    },
  },

  Mutation: {
    // COMMENT User Mutations
    addUser: async (parent: any, args: any) => {
      const user = await User.create(args);
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
            args[field] === undefined ||
            args[field] === ""
          )
            delete args[field];
        }

        if (Object.keys(args).length === 0) {
          console.log("no args");
          throw new UserInputError("Nothing Updated");
        }

        const user = await User.findByIdAndUpdate(context.user.data._id, args, {
          runValidators: true,
          new: true,
        });

        return user;
      }
    },
    deleteUser: async () => {},

    // COMMENT Product Mutations
    addProducts: async (
      parent: any,
      { files }: { files: UploadFile[] },
      context: any
    ) => {
      if (context.user) {
        try {
          // Resolve promises
          const resolvedFiles: UploadFile[] = [];
          files.forEach(async (file) => {
            const newFile = await Promise.resolve(file);
            resolvedFiles.push(newFile);
          });

          await Promise.all(
            resolvedFiles.map(async (file) => {
              try {
                const bucketResponse = await uploadObject(
                  file,
                  context.user.data.username
                );

                if (!bucketResponse) return false;

                // If the file uploaded then create new Product and update User
                try {
                  const newProduct = await Product.create({
                    name: file.filename.replace(/\.[^.]+$/, ""),
                    image: file.filename,
                  });

                  await User.findOneAndUpdate(
                    { _id: context.user.data._id },
                    { $addToSet: { products: newProduct._id } }
                  );
                } catch (err: any) {
                  console.error("Create Product error: ", err.message);
                }
              } catch (err: any) {
                console.error(`Error uploading: ${err.message}`);
              }
            })
          );
          return true;
        } catch (err: any) {
          console.error("Error: ", err.message);
        }
      }
      throw new AuthenticationError("You need to be logged in!");
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
    },
    updateCategory: async () => {},
    deleteCategory: async () => {},

    // COMMENT AUTH Mutation
    login: async (
      parent: any,
      { email, password }: { email: any; password: any }
    ) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
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
