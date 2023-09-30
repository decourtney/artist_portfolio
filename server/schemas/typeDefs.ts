import { gql } from "apollo-server-express";

const typeDefs = gql`
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
    email: String
    password: String
    role: String
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
      role: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      role: String
      product: String
    ): User
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
