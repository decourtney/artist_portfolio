import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($firstName: String, $lastName: String, $email: String, $password: String, $profilePic: String){
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, profilePic: $profilePic){
      _id
      email
    }
  }
`

export const UPLOAD_FILES = gql`
  mutation uploadFiles($files: [Upload!]) {
    addProducts(files: $files)
  }
`;
