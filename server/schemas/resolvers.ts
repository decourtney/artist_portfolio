// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
import { AuthenticationError } from "apollo-server-core";
import { User, Product, Category } from "../models";
import { signToken } from "../utils/auth";

// Need to figure out the correct type definitions

const resolvers = {
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

  Mutation: {},
};

export default resolvers;
