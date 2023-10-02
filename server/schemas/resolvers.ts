import { AuthenticationError } from "apollo-server-core";
import { User, Product, Category } from "../models";
import { signToken } from "../utils/auth";
// import GraphQLUpload from "graphql-upload-ts";

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
    },
  },
};

export default resolvers;
