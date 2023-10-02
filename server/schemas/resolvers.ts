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
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    user: async (parent: any, { email }: { email: String }, context: any) => {
      return User.findOne({ email }).populate({
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
  },
};

export default resolvers;
