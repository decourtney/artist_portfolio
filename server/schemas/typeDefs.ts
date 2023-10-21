import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Upload

  type Category {
    _id: ID
    name: String
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
    profilePic: String
    products: [Product]
    categories: [Category]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
    categories: [Category]
  }

  type Mutation {
    addUser(
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      profilePic: String
    ): User
    deleteUser(user: String!): Boolean
    login(email: String!, password: String!): Auth
    addProducts(files: [Upload!]!): Boolean
    updateProduct(product: String!): Boolean
    deleteProduct(product: String!): Boolean
  }
`;

export default typeDefs;
