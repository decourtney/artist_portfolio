// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
import { AuthenticationError } from "apollo-server-core";
import { User, Product, Category } from "../models";
import { signToken } from "../utils/auth";

const resolvers = {
  Query: {},
  Mutation: {},
};

export default resolvers;
