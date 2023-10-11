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
    me: async (parent: any, args: any, context: any) => {
      console.log("Query me context " + context);
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
    categories: async (parent: any, args: any, context: any) => {
      return Category.find();
    },
  },

  Mutation: {
    addUser: async (parent: any, args: any) => {
      const user = await User.create(args);
      // signToken is expecting _id to be a string
      const userIdAsString = user._id.toString();

      const token = signToken({ ...user, _id: userIdAsString });

      return { token, user };
    },
    updateUser: async () => {},
    deleteUser: async () => {},
    addProducts: async (
      parent: any,
      { files }: { files: UploadFile[] },
      context: any
    ) => {
      try {
        const resolvedFiles = await Promise.all(files);

        // Wait until all files have resolved
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
        console.error("Error overall: ", err.message);
      }
    },
    updateProduct: async () => {},
    deleteProduct: async () => {},
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
