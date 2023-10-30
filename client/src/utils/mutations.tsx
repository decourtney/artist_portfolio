import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
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
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $phone: String
    $street1: String
    $street2: String
    $city: String
    $state: String
    $postalCode: String
    $profilePic: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phone: $phone
      street1: $street1
      street2: $street2
      city: $city
      state: $state
      postalCode: $postalCode
      profilePic: $profilePic
    ) {
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

export const UPLOAD_FILES = gql`
  mutation uploadFiles($files: [Upload!]!) {
    addProducts(files: $files)
  }
`;
