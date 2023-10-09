import { AuthenticationError } from "apollo-server-core";
import { UserInputError } from "apollo-server-core";
import { User, Product, Category } from "../models";
import { signToken } from "../utils/auth";
import { uploadObject, deleteObject } from "../utils/objectLoader";

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
    uploadFiles: async (parent: any, {files}: any) => {
      const resolvedFiles = await Promise.all(files);
      // console.log(resolvedFiles);

      try {
        const bucketResponse = await uploadObject(resolvedFiles);
   // might change logic here. iterate through the files here so each entry can be linked to the db.
        // Finish logic for uploading files
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
