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
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user(email: String!): User
    me: User
    categories: [Category]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      product: String
    ): User
    login(email: String!, password: String!): Auth
    uploadFiles(files: [Upload]): Boolean
  }
`;

export default typeDefs;
