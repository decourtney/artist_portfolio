import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
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
      productCount
      categoryCount
    }
  }
`;

export const QUERY_USER_PRODUCTS = gql`
  query products($username: String!) {
    products(username: $username) {
      _id
      username
      products {
        _id
        name
        description
        image
        categories {
          _id
          name
        }
      }
      categories {
        _id
        name
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      fullname
      username
      email
      profilePic
      products {
        _id
        name
        description
        image
        categories {
          _id
          name
        }
      }
      categories {
        _id
        name
      }
    }
  }
`;
