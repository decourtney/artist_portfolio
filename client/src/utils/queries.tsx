import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      firstName
      lastName
      fullname
      username
      email
      phone
      street1
      street2
      city
      state
      postalCode
      profilePic
    }
  }
`;

export const QUERY_ACCOUNT = gql`
  query account($username: String!) {
    account(username: $username) {
      username
      productCount
      products {
        __typename
        name
        description
        image
        categories {
          __typename
          name
          defaultCategory
          image
        }
      }
      categoryCount
      categories {
        __typename
        name
        defaultCategory
        image
      }
    }
  }
`;

export const QUERY_USER_CATEGORIES = gql`
  query userCategories($username: String!) {
    userCategories(username: $username) {
      __typename
      categories {
        name
        defaultCategory
        image
        products {
          __typename
          name
          description
          image
        }
      }
    }
  }
`;

export const QUERY_USER_PRODUCT = gql`
  query userProduct($username: String!, $product: String!) {
    userProduct(username: $username, product: $product) {
      _id
      description
      image
      name
      categories {
        name
        defaultCategory
      }
    }
  }
`;

export const QUERY_CATEGORY = gql`
  query category($category: String!) {
    category(category: $category) {
      __typename
      name
      description
      image
      categories {
        name
        defaultCategory
        image
      }
    }
  }
`;
