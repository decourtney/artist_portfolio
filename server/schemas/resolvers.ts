import { AuthenticationError } from "apollo-server-core";
import { UserInputError } from "apollo-server-core";
import { User, Product, Category } from "../models";
import { signToken } from "../utils/auth";

// Need to figure out the correct type definitions

const resolvers = {
  Upload: require("graphql-upload-ts").GraphQLUpload,
  Query: {
    me: async (parent: any, args: any, context: any) => {
      if (context.user) {
        const stuff = await User.findOne({ _id: context.user._id });
        console.log(stuff);
        return stuff;
      }
      // throw new AuthenticationError("You need to be logged in!");
    },
    user: async (parent: any, args: any, context: any) => {
      return await User.findById(context.user._id).populate({
        path: "products",
        model: "Product",
        populate: [
          {
            path: "categories",
            model: "Category",
          },
        ],
      });
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
    uploadFiles: async (parent: any, { files }: any, context: any) => {
      console.log(files);
      try {
        if (!files || files.length === 0)
          throw new UserInputError(
            "No files were uploaded. Please select at least one file."
          );
        return true;
      } catch (err) {
        throw err;
      }
    },
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

      const token = signToken({ ...user, _id: user._id.toString() });
      return { token, user };
    },
  },
};

export default resolvers;
