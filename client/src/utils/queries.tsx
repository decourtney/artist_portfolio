import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
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
