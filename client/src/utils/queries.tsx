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
          image
        }
      }
      categoryCount
      categories {
        __typename
        name
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

export const QUERY_CATEGORY_PRODUCTS = gql`
  query categoryProducts($category: String!) {
    categoryProducts(category: $category) {
      __typename
      products {
        name
        description
        image
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
        image
      }
    }
  }
`;
