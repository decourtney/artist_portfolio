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
        name
        description
        image
        categories {
          name
          image
        }
      }
      categoryCount
      categories {
        name
        image
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query categories($username: String!) {
    categories(username: $username) {
      categories {
        name
        image
        products {
          name
          description
          image
        }
      }
    }
  }
`;

export const QUERY_CATEGORY = gql`
  query category($category: String!) {
    category(category: $category) {
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
