import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      firstName
      lastName
      email
      role
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
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      role
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
    }
  }
`;
