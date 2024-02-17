import gql from "graphql-tag";

const typeDefs = gql`
  scalar Upload

  type Category {
    _id: ID
    name: String
    defaultCategory: Boolean
    image: String
    products: [Product]
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
    account(username: String!): User
    userCategories(username: String!): User
    categoryProducts(category: String!): [Product]
    category(category: String!): [Product]
    userProduct(username: String!, product: String!): [Product]
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

    addProduct(file: Upload!): Boolean
    updateProduct(
      id: String!
      name: String
      description: String
      categories: [String]
    ): Product
    deleteProduct(product: String!): Boolean

    addCategory(username: String!, category: String!): User
    updateCategory(username: String!, category: String!): Category
    deleteCategory(username: String!, category: String!): User
  }
`;

export default typeDefs;
