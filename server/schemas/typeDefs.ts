import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Upload

  type Category {
    _id: ID
    name: String
    image: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    categories: [Category]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    fullname: String
    username: String
    email: String
    password: String
    phone: String
    street1: String
    street2: String
    city: String
    state: String
    postalCode: String
    profilePic: String
    products: [Product]
    productCount: String
    categories: [Category]
    categoryCount: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
    account(username: String!): User
    categories: [Category]
  }

  type Mutation {
    addUser(email: String!, password: String!): Auth
    updateUser(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      phone: String
      street1: String
      street2: String
      city: String
      state: String
      postalCode: String
      profilePic: String
    ): User
    deleteUser(user: String!): Boolean
    login(email: String!, password: String!): Auth

    addProducts(files: [Upload!]!): Boolean
    updateProduct(product: String!): Boolean
    deleteProduct(product: String!): Boolean

    addCategory(username: String!, category: String!): User
    updateCategory(username: String!, category: String!, image: String): User
    deleteCategory(username: String!, category: String!): User
  }
`;

export default typeDefs;
