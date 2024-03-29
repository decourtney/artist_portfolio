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
      try {
        const user = await User.findOne({ username: username });
        const userCategories = await User.findOne(
          { username: username },
          "categories"
        ).populate({
          path: "categories",
          model: "Category",
          populate: {
            path: "products",
            model: "Product",
            match: { user: user?._id },
          },
        });

        return userCategories;
      } catch (err) {
        throw new GraphQLError("Failed to locate user categories");
      }
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
    userProduct: async (
      parent: any,
      { username, product }: { username: String; product: String },
      context: any
    ) => {
      try {
        // Aggregate query to verify the product belongs to the username
        const userProduct = await Product.aggregate([
          {
            $match: { name: product },
          },
          {
            $lookup: {
              from: "user",
              localField: "user",
              foreignField: "_id",
              as: "user",
            },
          },
          {
            $unwind: "$user",
          },
          {
            $match: { "user.username": username },
          },
          {
            $lookup: {
              from: "category",
              localField: "categories",
              foreignField: "_id",
              as: "categories",
            },
          },
          {
            $unwind: "$categories",
          },
          {
            $group: {
              _id: "$_id",
              name: { $first: "$name" },
              image: { $first: "$image" },
              description: { $first: "$description" },
              categories: { $push: "$categories" },
            },
          },
          {
            $project: {
              name: 1,
              image: 1,
              description: 1,
              categories: 1,
            },
          },
        ]);

        return userProduct;
      } catch (err) {
        console.log(err);
        throw new GraphQLError("Failed to locate product");
      }
    },
  },

  Mutation: {
    // COMMENT User Mutations
    addUser: async (parent: any, args: any) => {
      try {
        // Create user and the default category - All Artwork
        const user = await User.create(args);

        const defaultCategory = await Category.findOne({
          defaultCategory: true,
        });

        await User.findOneAndUpdate(user._id, {
          $addToSet: { categories: defaultCategory?._id },
        });

        // const bucketResponse = await uploadObject(
        //   createReadStream(),
        //   filename,
        //   mimetype,
        //   encoding,
        //   context.user.data.username
        // );

        // signToken is expecting _id to be a string
        const userIdAsString = user._id.toString();

        const token = signToken({ ...user, _id: userIdAsString });

        return { token, user };
      } catch (err: any) {
        throw new GraphQLError("Failed to create new user");
      }
    },
    updateUser: async (parent: any, args: any, context: any) => {
      if (context.user) {
        try {
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

          const user = await User.findByIdAndUpdate(
            context.user.data._id,
            args,
            {
              runValidators: true,
              new: true,
            }
          );

          return user;
        } catch (err: any) {
          throw new GraphQLError("Failed to create new user");
        }
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
        // Destructuring file avoids issue with promise wrap in objectLoader - it works, so good enough for now
        const { createReadStream, filename, mimetype, encoding } = await file; // Await destructuring

        try {
          const bucketResponse = await uploadObject(
            createReadStream(),
            filename,
            mimetype,
            encoding,
            context.user.data.username
          );

          if (!bucketResponse) throw new GraphQLError("Failed to upload");

          // All new products should include a default Category. Attempt to find it or create it
          let defaultCategory = null;
          defaultCategory = await Category.findOne(
            {
              defaultCategory: true,
            },
            "_id"
          );

          if (!defaultCategory) {
            defaultCategory = await Category.create({
              name: "All Artwork",
              defaultCategory: true,
            });
          }

          const user = await User.findById(context.user.data._id);

          if (!user) throw new GraphQLError("Failed to find user");

          // Create new product
          const newProduct = await Product.create({
            name: filename.replace(/\.[^.]+$/, ""), // strip file extension
            image: filename,
            user: user?._id,
            categories: [defaultCategory?._id],
          });

          if (!newProduct) throw new GraphQLError("Failed to create product");

          // Update User and Category
          await User.findOneAndUpdate(
            { _id: context.user.data._id },
            { $addToSet: { products: newProduct._id } }
          );

          await Category.findOneAndUpdate(
            { defaultCategory: true },
            { $addToSet: { products: newProduct._id } }
          );

          return true;
        } catch (err: any) {
          throw new GraphQLError("Failed to upload or create product");
          // TODO Need perform cleanup if this fails - remove bucket and/or db entry
        }
      }
      throw new GraphQLError("You need to be logged in");
    },
    updateProduct: async (
      parent: any,
      {
        id,
        name,
        description,
        categories,
      }: {
        id: string;
        name: string;
        description: string;
        categories: (typeof Category)[];
      },
      context: any
    ) => {
      if (context.user) {
        try {
          let categoryIds = [];

          // Get old list of categories
          const oldProductCategories = await Product.findById(id)
            .populate({
              path: "categories",
              model: "Category",
              select: "name",
            })
            .select("categories");

          // Need to update any Categories that are to be removed
          if (oldProductCategories) {
            const oldCategoryNames = oldProductCategories.categories.map(
              (category) => category.name
            );

            // Find the categories that are in the old list but not in the new list
            const removedCategories = oldCategoryNames.filter(
              (categoryName) =>
                !categories.some((category) => category.name === categoryName)
            );

            console.log("categories to remove", removedCategories);

            if (removedCategories.length > 0) {
              for (const categoryName of removedCategories) {
                try {
                  const category = await Category.findOne({
                    name: categoryName,
                  });

                  if (category) {
                    category.products = category.products.filter(
                      (productId) => productId.toString() !== id
                    );

                    await category.save();

                    console.log(
                      `Product removed from category: ${categoryName}`
                    );
                  }
                } catch (err) {
                  // console.error(err);
                  console.error(
                    `Failed to remove product from category: ${categoryName}`
                  );
                }
              }
            }
          }

          if (categories && categories.length > 0) {
            for (const c of categories) {
              const category = await Category.findOne({ name: c.name });
              if (category) {
                await Category.updateOne(
                  { _id: category._id },
                  { $addToSet: { products: id } }
                );
                categoryIds.push(category._id);
              }
            }
          }

          console.log("updated Categories", categoryIds);

          const updatedProduct = await Product.findByIdAndUpdate(
            { _id: id },
            {
              name,
              description,
              categories: categoryIds,
            },
            { new: true }
          );

          console.log("updated Product", updatedProduct);
          return updatedProduct;
        } catch (err: any) {
          console.log(err.message);
          throw new GraphQLError("Failed to update product");
        }
      }
      throw new GraphQLError("You need to be logged in");
    },
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
          throw new GraphQLError("Failed to create category");
        }
      }
      throw new GraphQLError("You need to be logged in");
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
            "categories",
            {
              categories: { $elemMatch: { $where: { name: category } } },
            }
          ).populate({ path: "categories", model: "Category" });

          if (!userCategory || !userCategory.categories.length) {
            throw new GraphQLError("Category not found for the user");
          }

          const categoryToUpdate = userCategory?.categories[0];
          if (categoryToUpdate.defaultCategory)
            throw new GraphQLError("The default category cannot be modified");

          const updatedCategory = await Category.findByIdAndUpdate(
            categoryToUpdate._id,
            { name: name, image: image },
            { new: true }
          );

          return updatedCategory;
        } catch (err: any) {
          console.error("Create Category error: ", err.message);
          throw new GraphQLError("Error updating category");
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
      try {
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
      } catch (err: any) {
        throw new GraphQLError("Incorrect credentials", err.message);
      }
    },
  },
};

export default resolvers;
