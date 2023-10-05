import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
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
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
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
    }
  }
`;
